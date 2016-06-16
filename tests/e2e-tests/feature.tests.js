describe('Map Page', function() {
  it('should have hello world in it', function() {
    browser.get('/');
    expect($$("p").first().getText()).toEqual('Hello World');
  });

  it('should have a map container', function() {
    browser.get('/');
    expect(element(by.id('mapContainer')).isPresent()).toBe(true);
  });
});
