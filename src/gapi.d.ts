declare namespace gapi {
    function load(api: string, callback: () => void): void;
  
    const auth2: {
      init(options: { client_id: string }): Promise<any>;
      getAuthInstance(): any;
    };
  }