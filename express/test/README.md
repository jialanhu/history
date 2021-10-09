# mocha coverage report

## Installation
1.  npm install mocha -g
2.  npm install nyc -g
3.  npm install chai
4.  npm install chai-http

## command
nyc --reporter=cobertura --reporter=html mocha './test/\*/\*' --exit