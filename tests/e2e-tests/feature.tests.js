describe('Map Page', function() {
  it('should have hello world in it', function() {
    browser.get('/');
    expect($('#test')).toMatch('Hello World');
  });
});
