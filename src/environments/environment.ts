// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  apiUrl: "https://localhost:44327",
  //apiUrl: 'https://store.unchained-music.com',

  production: false,
  contractTestAddress: "0x111c06bad93f06e2300104a3c24c51f91be5fce1",
  marketplaceTestAddress: "0x95c9d0B1492bb99109c12e7014225eb1b83164D5"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
