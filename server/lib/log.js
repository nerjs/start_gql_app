import colors from 'colors'
import * as util from 'util'

const logFn = arg => util.format.apply(util, arg);

const getName = (name,type,style) => util.format(name.toString().black,':'.red,type[style]).bgWhite

const getArg = arg => {
  let res = [];

  for (let i=0; i<arg.length; i++) {
    if (typeof arg[i] == 'string') res.push(arg[i].green);
      else if (typeof arg[i] == 'number') res.push(arg[i].toString().cyan);
      else if (typeof arg[i] == 'boolean') res.push(arg[i].toString().blue);
      else if (arg[i] === null) res.push('NULL'.blue);
      else if (arg[i] === undefined) res.push('undefined'.blue);
      else if (arg[i] instanceof Date) res.push(`${arg[i].toLocaleString().replace(' ','|')}|${arg[i].getMilliseconds()}`.magenta);
      else res.push(arg[i])
  }
  return res;
}

const timeParse = time => {
  if (!time || typeof time != 'number') return `${'0'.blue}:ms`;
  if (time < 1000) return `${time.toString().blue}:ms`;
  let str = '',
    s = 1000,
    m = s*60,
    h = m*60,
    d = h*24,
    t = 0,
    t1 = 0;
  
  t1 = (time % d)
  t = (time - t1) / d;
  if (t > 0) str += `${t.toString().blue}:d `;

  
  t = (t1 % h)
  t1 = (t1 - t) / h;
  if (t1 > 0) str += `${t1.toString().blue}:h `;
    else if(str.length > 0) str += `${'0'.blue}:h `;
  
  t1 = (t % m)
  t = (t - t1) / m;
  if (t > 0) str += `${t.toString().blue}:m `;
    else if(str.length > 0) str += `${'0'.blue}:m `;
  
  t = (t1 % s)
  t1 = (t1 - t) / s;
  if (t1 > 0) str += `${t1.toString().blue}:s `;
    else if(str.length > 0) str += `${'0'.blue}:s `;

  if (t >= 0) str += `${t.toString().blue}:ms`;
  return str;
}

export default (name, pre) => {
  const dirSetting = { ...{
      colors : true,
      showHidden : false,
      dipth : 3
    }, ...pre}

  const timers = {};

  const log = function Logger() {
    if (arguments[0] instanceof Error) return log.error.apply(this, arguments)
      else if (typeof arguments[0] == 'object' || typeof arguments[0] == 'function') return log.dir.apply(this, arguments);
    
    log.log.apply(this, getArg(arguments))
  }

  log.log = function() {
    console.log(getName(name,'log','cyan'),logFn(arguments))
  }

  log.debug = function() {
    console.log(getName(name,'debug','blue'),logFn(arguments))
  }

  log.info = function() {
    console.log(getName(name,'info','green'),logFn(arguments))
  }

  log.error = function(err) {
    var message = '';
    if (err instanceof Error) {
      message = err.toString()
    } else {
      message = err;
    }
    console.error(getName(name,'error','red'),message);
    if (!(err instanceof Error)) return;
    var data = {}, 
      stack = err.stack;
    Object.keys(err).forEach(v => {
      if (v != 'stack' && v != 'name' && v != 'message') data[v] = err[v]
    })
    if (Object.keys(data).length > 0) {
      console.log(util.format('\t',data).red)
    }
    if (stack && stack.length > 5) {
      var st = stack.split('\n');
      if (st.length < 2) return;
      var str = '';
      if (st[1]) str += st[1];
      if (st[2]) str += `\n${st[2]}`;
      if (st[3]) str += `\n${st[3]}`;
      console.log(str.green)
    }
  }

  log.dir = function(obj) {
    console.log(getName(name,'dir','magenta'))
    if (arguments.length > 1) obj = arguments;
    console.dir(obj, dirSetting)
  }

  log.time = timersName => {
    if (!timersName || !timersName.toString) return;
    timersName = timersName.toString();
    let date = new Date();
    timers[timersName] = date.getTime();
    console.log(getName(name,'start timer','magenta'),timersName.green,date.toLocaleString(), date.getMilliseconds())
  }

  log.timeEnd = timersName => {
    if (!timersName || !timersName.toString) return;
    timersName = timersName.toString();
    if (!timers[timersName]) return;
    let time = Date.now() - timers[timersName];
    console.log(getName(name,'  end timer','magenta'),timersName.green.bold,timeParse(time), ` (${time})`);
    delete timers[timersName];
  }

  log.timeParse = timeParse;

  return log;
}