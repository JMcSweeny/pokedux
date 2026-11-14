import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';

const repoBase = '/pokedux';

function injectRepoBase(base) {
  return {
    name: 'inject-repo-base',
    transformIndexHtml(html) {
      return html.replaceAll('__REPO_BASE__', base);
    },
    writeBundle(options) {
      const outDir = options.dir ?? 'dist';
      const fourOhFour = path.join(outDir, '404.html');
      if (fs.existsSync(fourOhFour)) {
        const updated = fs.readFileSync(fourOhFour, 'utf8').replaceAll('__REPO_BASE__', base);
        fs.writeFileSync(fourOhFour, updated);
      }
    },
  };
}

export default defineConfig(({ command }) => {
  const isPreview = process.argv.includes('preview');
  const activeBase = command === 'build' || isPreview ? repoBase : '';

  return {
    base: `${activeBase}/`,
    server: {
        open: true
    },
    preview: {
        open: `${repoBase}/`,
    },
    plugins: [injectRepoBase(activeBase)],
    define: {
      __REPO_BASE__: JSON.stringify(activeBase),
      global: 'window',
    },
    esbuild: {
      jsxFactory: 'React.createElement',
      jsxFragment: 'React.Fragment',
      loader: 'jsx',
      include: /src\/.*\.[jt]sx?$/,
    },
    resolve: {
      extensions: ['.mjs', '.js', '.jsx', '.json'],
    },
  };
});