// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  //endpoint: 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect',
  //subscriptionKey: '9c48f86801f74031a927a15c8f9b2131'
  //subscriptionKey: string = '151b8182d2ec4d1381b2a4a2e0a90bce';
  
  endpoint: 'https://centralindia.api.cognitive.microsoft.com/face/v1.0/detect',
  subscriptionKey: '9978509ccf914dceb60a09de5b05e8d0'
};
