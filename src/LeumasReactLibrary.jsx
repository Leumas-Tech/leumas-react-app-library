import React, { useState, useEffect, Suspense } from 'react';
import * as Babel from '@babel/standalone';
import axios from 'axios';

const DynamicComponentLoader = ({ path }) => {
  const [Component, setComponent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComponentCode = async (path) => {
      try {
        const response = await axios.get(`https://leumas-api-63700dc8135b.herokuapp.com/react-apps/get-app/react-apps/${path}`);
        const { mainCode, dependencies } = response.data;
        const component = await executeCode(mainCode, dependencies);
        setComponent(() => component);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchComponentCode(path);
  }, [path]);

  const executeCode = (mainCode, dependencies) => {
    const exports = {};
    const module = { exports };

    const depsObject = {
      React,
      useState,
      useEffect,
      Suspense,
      require: (name) => {
        if (name === 'react') return React;
        if (dependencies[name]) {
          const transformedCode = Babel.transform(dependencies[name], {
            presets: ['es2015', 'react'],
          }).code;
          const dependencyModule = { exports: {} };
          new Function('React', 'module', 'exports', 'require', transformedCode)(
            React,
            dependencyModule,
            dependencyModule.exports,
            depsObject.require
          );
          return dependencyModule.exports;
        }
        throw new Error(`Module not found: ${name}`);
      }
    };

    const transformedMainCode = Babel.transform(mainCode, {
      presets: ['es2015', 'react'],
    }).code;

    new Function('React', 'useState', 'useEffect', 'Suspense', 'module', 'exports', 'require', transformedMainCode)(
      React,
      useState,
      useEffect,
      Suspense,
      module,
      exports,
      depsObject.require
    );

    return module.exports.default || module.exports;
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!Component) {
    return <div>Loading...</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  );
};

export default DynamicComponentLoader;
