var expect = require('expect.js');

describe('Expresso', function() {
  describe('not null', function() {
    it('should found expressojs', function() {
      var express = require('express');
	  expect(express).not.to.be(null);
    });
  });
});