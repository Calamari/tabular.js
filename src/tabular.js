(function() {
  'use strict';

  function Tabular(config) {
    this._config = config || {};
  }

  Tabular.prototype.lines = function TabularLines(obj) {
    if (typeof obj === 'string') {
      // simple string
      return [obj];
    } else if (typeof obj[0] === 'string') {
      // no nested array
      return [obj.join(' ')];
    }

    function timesChar(times, char) {
      var result = '';
      while (times--) {
        result += char;
      }
      return result;
    }
    var cellLengths = [],
        numLines = obj.length,

        resultLines = [],
        i, j, line;

    for (i=0; i<numLines; ++i) {
      for (j=0; j<obj[i].length; ++j) {
        cellLengths[j] = Math.max(cellLengths[j] || 0, obj[i][j].length);
      }
    }

    for (i=0; i<numLines; ++i) {
      line = [];
      for (j=0; j<obj[i].length; ++j) {
        line[j] = obj[i][j] + timesChar(cellLengths[j] - obj[i][j].length, ' ');
      }
      resultLines.push(line.join(' '));
    }
    return resultLines;
  };

  Tabular.prototype.render = function TabularRender(obj) {
    return this.lines(obj).join('\n');
  };

  module.exports = Tabular;
}());