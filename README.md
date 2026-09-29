## Demo
The deployed version is on [nicu-chiciuc.github.io/impossible-object](https://nicu-chiciuc.github.io/impossible-object/)

![Screen capture of the project ](https://raw.githubusercontent.com/nicu-chiciuc/impossible-object/master/demo/demo.gif)

The project was created as a solution for a JavaScript meet-up challenge: [JSMD challenge #0.](https://github.com/JSMD/challenges/blob/master/challenge%20%230/README.md)

### Controls
Most of the controls are quite self-explanatory.

The `secret` toolbar contains some settings which are more advanced and are not really needed but were left as a way for the user to experiment and understand how to the application works.

The `compositeMode` corresponds with composite mode of the JS Canvas. The 3 uppermost settings are the only ones that make sense to use yet all the other ones were also added.

The `renderMethod` will provides 2 methods of drawing the cubes.

The `full` option will use another canvas with the same size as the visible one to render partial cubes.

The `single` option will use just a small canvas to draw the partial cube and thus should be smaller yet it may create small sub-pixel artifacts (which are really hard to observe).

Both methods were added because I tried to decide which one was better. The `full` method needs a bigger canvas and is a little bit slower yet it seems to have a better visual result.

## Building
To create the project the `webpack` or `webpack --watch` commands can be used which will create a `/dist` folder.

To serve this folder, `webpack-dev-server` or `http-server` or any other server can be used.


## Cloudflare Worker Previews

Workers Builds runs `npm run build`, then `npm run deploy` for the production
branch or `npm run deploy:preview` for other branches. The preview command uses
native Worker Previews with Wrangler 4.136.2. The empty `previews` config keeps
this app assets-only; no Convex keys or runtime secrets are required.

For an existing Worker, first use **Settings > Builds > Set up Worker Previews**
and restore the commands above after Cloudflare replaces the preview command.
Keep the existing build root and enable non-production branch builds. Verify the
new preview URL and application before completing the rollout.

Build before any manual deploy. To check the production package without an upload,
run `npm exec -- wrangler deploy --dry-run` after the build.
Worker Previews has no dry-run mode.
See the [Worker Previews configuration](https://developers.cloudflare.com/workers/previews/configuration/)
and [existing Worker setup](https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/#existing-workers-connected-to-builds).
