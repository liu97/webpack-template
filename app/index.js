import './index.less';

class Animal {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}

const dog = new Animal('dog');
console.log(_.uniq([1, 2, 3, 1]));
console.log(dog.getName());

class B extends Component {

}

window.onload = function () {
  document.getElementById('btn').onclick = function () {
    import(/* webpackChunkName: "handle" */'./handle').then(fn => { fn.pri() });
  }
}