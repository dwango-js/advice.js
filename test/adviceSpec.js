describe('advice', function() {

  describe('compose a function', function() {
    var base;
    var results;

    beforeEach(function() {
      results = [];
      base = function(value) {
        var result = 'base: ' + value;
        results.push(result);
        return result;
      };
    });

    describe('before', function() {
      it('should compose a new function which executes the "before" function before the base one', function() {
        var fn = advice.before(base, function(value) {
          var result = 'before: ' + value;
          results.push(result);
          return result;
        });

        expect(fn('foo')).toEqual('base: foo');
        expect(results.join(', ')).toEqual('before: foo, base: foo');
      });
    });

    describe('after', function () {
      it('should compose a new function which executes the "after" function after the base one', function() {
        var fn = advice.after(base, function(value) {
          var result = 'after: ' + value;
          results.push(result);
          return result;
        });

        expect(fn('foo')).toEqual('base: foo');
        expect(results.join(', ')).toEqual('base: foo, after: foo');
      });
    });

    describe('around', function () {
      it('should compose a new function which executes the "around" function with base one in the first argument', function() {
        var fn = advice.around(base, function(base, value) {
          var result = 'around: ' + value;
          results.push('before: ' + value);
          base('bar');
          results.push('after: ' + value);
          return result;
        });

        expect(fn('foo')).toEqual('around: foo');
        expect(results.join(', ')).toEqual('before: foo, base: bar, after: foo');
      });
    });
  });

  describe('compose a method', function() {
    var subject;

    beforeEach(function() {
      subject = {results: []};
      subject.base = function(value) {
        var result = 'base: ' + value;
        this.results.push(result);
        return result;
      };
    });

    describe('before', function() {
      it('should compose a new method which executes the "before" function before the base one', function() {
        var fn = advice.before(subject, 'base', function(value) {
          var result = 'before: ' + value;
          this.results.push(result);
          return result;
        });

        expect(fn('foo')).toEqual('base: foo');
        expect(subject.results.join(', ')).toEqual('before: foo, base: foo');
      });
    });

    describe('after', function () {
      it('should compose a new method which executes the "before" function before the base one', function() {
        var fn = advice.after(subject, 'base', function(value) {
          var result = 'after: ' + value;
          this.results.push(result);
          return result;
        });

        expect(fn('foo')).toEqual('base: foo');
        expect(subject.results.join(', ')).toEqual('base: foo, after: foo');
      });
    });

    describe('around', function () {
      it('should compose a new method which executes the "around" function with base one in the first argument', function() {
        var fn = advice.around(subject, 'base', function(base, value) {
          var result = 'around: ' + value;
          this.results.push('before: ' + value);
          base.call(this, 'bar');
          this.results.push('after: ' + value);
          return result;
        });

        expect(fn('foo')).toEqual('around: foo');
        expect(subject.results.join(', ')).toEqual('before: foo, base: bar, after: foo');
      });
    });
  });
});
