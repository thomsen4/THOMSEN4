export class App {
  configureRouter(config, router) {
    this.router = router;
    config.map([
      {
        route: ["",'foos'],
        moduleId: './modules/foos',
        name: 'Foos',
      },
    ]);
  }
}