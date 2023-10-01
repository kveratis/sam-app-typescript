import { argv } from 'node:process';
import * as esbuild from 'esbuild';

const getArg = (args, index, fallback) => {
  return args.length >= index ? args[index] ?? fallback : fallback;
};

const getMode = (args) => {
  const mode = getArg(args, 2, process.env.NODE_ENV ?? 'dev');
  return 'prod' === mode;
};

const getWatch = (args) => {
  if (args !== undefined) {
    const arg3 = getArg(args, 3, '');
    const arg4 = getArg(args, 4, '');

    return 'watch' === arg3 || 'watch' === arg4;
  }

  return false;
};

const getEntryPoints = (args, fallback) => {
  const arg3 = getArg(args, 3, '');
  const arg4 = getArg(args, 4, '');
  return arg3.endsWith('.ts') ? [`${arg3}`] : arg4.endsWith('.ts') ? [`${arg4}`] : fallback;
};

const allEntryPoints = ['./src/app.js'];
const isProduction = getMode(argv);
const watchMode = getWatch(argv);
const entryPoints = getEntryPoints(argv, allEntryPoints);

console.log(
  `${isProduction ? 'production' : 'development'} build on ${entryPoints} ${
    watchMode ? 'with watching' : 'without watching'
  }`,
);

const buildJS = await esbuild.context({
  entryPoints: entryPoints,
  bundle: true,
  platform: 'node',
  target: 'es2022',
  format: 'esm',
  outExtension: { '.js': '.mjs' },
  outdir: 'dist',
  logLevel: isProduction ? 'error' : 'info',
  drop: isProduction ? ['debugger'] : [],
  sourcemap: !isProduction && 'linked',
  minifyWhitespace: isProduction,
  minifySyntax: isProduction,
});

if (watchMode) {
  await buildJS.watch();
} else {
  await buildJS.rebuild();
}

buildJS.dispose(); // free up resources
