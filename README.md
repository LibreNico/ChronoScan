# ChronoScan
App to subscribe to a run and to record the timing via BIB scanning

## Config

### Security
In the `keys` folder you need to add your own RS256 `private.key` and `public.key`.<br />
You can genareted them on http://travistidwell.com/jsencrypt/demo/ -> watch out the <b>key size</b> must be <b>512 bits</b>.

### Mail
In the `keys` folder you need to add the `mailenv.js` with inside:
```javascript
module.exports.EMAIL_USER="xxx@gmail.com";
module.exports.EMAIL_PASSWORD="xxxx";
```


