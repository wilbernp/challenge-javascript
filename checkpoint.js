// ----- IMPORTANTE -----

// IMPORTANTE!: Para este checkpoint se les brindarán las 
// implementaciones ya realizadas en las homeworks de 
// Queue, LinkedList y BinarySearchTree.
// Sobre dichas implementaciónes van a tener que agregar nuevos
// métodos o construir determinadas funciones explicados más abajo.
// Pero todos los métodos ya implementados en las homeowrks no es 
// necesario que los vuelvan a definir.

const { list } = require('mocha/lib/reporters');
const {
    Queue,
    LinkedList,
    Node,
    BinarySearchTree
} = require('./DS.js');

// ----- Closures -----

// EJERCICIO 1
// Implementar la funcion 'exponencial' que recibe un parametro entero 'exp'
// y retorna una una funcion, nos referiremos a esta ultima como funcion hija,
// y a 'exponencial' como la funcion padre, la funcion hija debe de recibir 
// un parametro y retornar dicho parametro elevado al parametro 'exp' de 
// la funcion padre original 'exponencial'
// Ejemplo:
// > var sqrt = exponencial(2);
// > sqrt(2);
// < 4
// > sqrt(3);
// < 9
// > sqrt(4);
// < 16

function exponencial(exp) {
    return function (v) {
        return v ** exp
    }
}

// ----- Recursión -----

// EJERCICIO 2
// Crear la funcion 'direcciones':
// La funcion debe retornar un string de los movimientos Norte(N), Sur(S), Este(E), Oeste(O)
// que se deben realizar, para llegar al destino de un laberinto dado.
//
// Ejemplo: dado el siguiente laberinto:
// let obj = { // direccion = ""
//     N: 'pared',
//     S: { // direccion = "S"
//         N: 'pared',
//         S: 'pared',
//         E: { // direccion = "SE"
//             N: 'pared', // direccion = "SEN"
//             S: 'pared',
//             E: 'pared',
//             O: 'pared'
//         },
//         O: { // direccion = "SO"
//             N: 'pared',
//             S: 'pared',
//             E: 'pared',
//             O: 'pared'
//         }
//     },
//     E: 'destino',
//     O: 'pared'
// }
// El retorno de la funcion 'direcciones' debe ser 'SEN', ya que el destino se encuentra
// haciendo los movimientos SUR->ESTE->NORTE
// Aclaraciones: el segundo parametro que recibe la funcion ('direccion') puede ser pasado vacio (null)

var direcciones = function (obj) {
    let direccion = '';
    if (!obj) {
        return "";
    }
    for (let prop in obj) {
        if (obj[prop] === 'destino') {
            return direccion += prop;
        } else {
            if (typeof obj[prop] === 'object') {
                return direccion += prop + direcciones(obj[prop]);
            }
        }
    }
    return ""
}



// EJERCICIO 3
// Crea la funcion 'deepEqualArrays':
// Dado que las comparaciones en javascript aveces son un problema como con el siguiente ejemplo:
// [0,1,2] === [0,1,2] => false // puede probarlo en la consola
// con objetos o arrays identicos surge la necesidad de comparar en 'profundidad' arrays u objetos
// en este caso la funcion solo va a ser pensada para recibir arrays,
// pero estos pueden tener multiples niveles de anidacion, y la funcion deepEqualArrays debe
// comparar cada elemento, sin importar la profundidad en la que este
// Ejemplos: 
// deepEqualArrays([0,1,2], [0,1,2]) => true
// deepEqualArrays([0,1,2], [0,1,2,3]) => false
// deepEqualArrays([0,1,[[0,1,2],1,2]], [0,1,[[0,1,2],1,2]]) => true

function deepEqualArrays(arr1, arr2) {
    let c = 0;

    if (arr1.length !== arr2.length) {
        return false;
    }

    while (c < arr1.length) {

        if (Array.isArray(arr1[c]) && Array.isArray(arr2[c])) {
            return deepEqualArrays(arr1[c], arr2[c])
        }
        if (arr1[c] !== arr2[c]) {
            return false;
        } else {
            c++;
        }
    }
    if (c === arr1.length) {
        return true;
    }
}



// ----- LinkedList -----

// Deben completar la siguiente implementacion 'OrderedLinkedList'(OLL)
// que es muy similar a las LinkedList vistas en clase solo que 
// los metodos son distintos y deben de estar pensados para conservar la lista
// ordenada de mayor a menor.
// ejemplos:
// head --> 5 --> 3 --> 2 --> null
// head --> 4 --> 3 --> 1 --> null
// head --> 9 --> 3 --> -1 --> null
// Las dos clases principales ya van a estar implementadas a continuacion:
function OrderedLinkedList() {
    this.head = null;
}
// notar que Node esta implementado en el archivo DS

// Y el metodo print que permite visualizar la lista:
OrderedLinkedList.prototype.print = function () {
    let print = 'head'
    let pointer = this.head
    while (pointer) {
        print += ' --> ' + pointer.value
        pointer = pointer.next;
    }
    print += ' --> null'
    return print
}

// EJERCICIO 4
// Crea el metodo 'add' que debe agregar nodos a la OLL de forma que la misma se conserve ordenada:
// Ejemplo:
// > LL.print()
// < 'head --> null'
// > LL.add(1)
// > LL.print()
// < 'head --> 1 --> null'
//    2       c
// > LL.add(5)
// > LL.print()
// < 'head --> 5 --> 1 --> null'
// > LL.add(4)
// > LL.print()
// < 'head --> 5 --> 3 --> 1 --> null'
//               4
OrderedLinkedList.prototype.add = function (value) {
    let nodo = new Node(value);

    //determina si la lista esta vacia
    if (!this.head) {
        //la lista quedaria asi: lista={head:{value: value, next:null}}
        this.head = nodo;
        return;
    }

    //compara si valor del nodo es menor al primer valor de la lista y si la lista tiene mas de un nodo
    if (nodo.value < this.head.value && !this.head.next) {
        //la lista quedaris asi: lista={head:{value: value, next:{value: value, next:null}}} es decir el primer next de la lista se le agrega el nuevo nodo
        this.head.next = nodo;
        return;
    }

    //si el valor del nodo es mayor al primer valor de la lista
    if (nodo.value > this.head.value) {
        //el next del nuevo nodo apuntara a lo mismo que apunte el head de la lista:
        //nodo={value:value, next:"head"{...}}
        nodo.next = this.head;
        //el head apuntara al nodo el cual tendra todo lo que tenia el head: 
        //head="nodo"{value:value, next{...}}
        this.head = nodo;
        return;
    }

    //se guarda todo lo que tiene el head de la lista
    let current = this.head;

    //mientras el valor del nodo sea menor al valor al que esta apuntando el next del current y que ese next no este apuntando a null
    while (nodo.value < current.next.value && current.next) {
        //current avanzara una pocision y por tanto apuntara al objeto que tiene en su next
        current = current.next;
    }

    //si current no quedo haciendo refencia a un objeto next que apuntara a null, es decir que en su propiedad (objeto) next haya algo
    if (current.next) {
        //el next del nuevo nodo apunta a todo lo que esta en la propiedad(objeto) next del current
        nodo.next = current.next;
        //la propiedad(objeto) next del current apuntara al nuevo nodo el cual quedo con todo lo que tenia el next del current
        current.next = nodo;
    } else {
        current.next = nodo;
    }
}

// let ol = new OrderedLinkedList();
// ol.add(5)
// console.log(ol)
// ol.add(4)
// console.log(ol)
// ol.add(6)
// console.log(ol)



// EJERCICIO 5
// Crea el metodo 'removeHigher' que deve devolver el valor mas alto de la linked list 
// removiendo su nodo corresponidente:
// Ejemplo:
// > LL.print()
// < 'head --> 5 --> 4 --> 1 --> null'
// > LL.removeHigher()
// < 5
// > LL.removeHigher()
// < 4
// > LL.removeHigher()
// < 1
// > LL.removeHigher()
// < null

OrderedLinkedList.prototype.removeHigher = function () {
    if (!this.head) {
        return null;
    }

    if (!this.head.next) {
        let n = this.head.value
        this.head = null;
        return n
    }
    let n = this.head.value;
    this.head = this.head.next;
    return n;
}

// console.log(ol.removeHigher())
// console.log(ol)
// console.log(ol.removeHigher())
// console.log(ol)
// console.log(ol.removeHigher())
// console.log(ol)

// EJERCICIO 6
// Crea el metodo 'removeLower' que deve devolver el valor mas bajo de la linked list 
// removiendo su nodo corresponidente:
// Ejemplo:
// > LL.print()
// < 'head --> 5 --> 4 --> 1 --> null'
// > LL.removeHigher()
// < 1
// > LL.removeHigher()
// < 4
// > LL.removeHigher()
// < 5
// > LL.removeHigher()
// < null

OrderedLinkedList.prototype.removeLower = function () {
    if(!this.head) return null;
    if(!this.head.next) {
        let n = this.head.value;
        this.head = null;
        return n;
    }
    let current = this.head;
    while(current.next.next){
        current = current.next;
    }
    let n = current.next.value;
    current.next = null;
    return n;
}





// ----- QUEUE -----

// EJERCICIO 7
// Implementar la funcion multiCallbacks:
// la funcion multiCallbacks recibe dos arrays de objetos cuyas propiedades son dos,
// 'cb' que es una funcion, y 'time' que es el tiempo estimado de ejecucion de dicha funcion 
// este ultimo representado con un integer como se muestra acontinuacion:
// let cbsExample = [
//     {cb:function(){}, time: 2},
//     {cb:function(){}, time: 3}
// ]
// De manera que lo que nuestra funcion 'multiCallbacks' debe de ir ejecutando las funciones 
// sin pasarle parametros pero debe ir alternando las funciones de cbs1 y cbs2 
// segun cual de estas se estima que tarde menos, retornando un arreglo de resultados
// de las mismas en el orden que fueron ejecutadas
// Ejemplo:
// > let cbs1 = [
//       {cb:function(){return '1-1'}, time: 2},
//       {cb:function(){return '1-2'}, time: 3}
//   ];
// > let cbs2 = [
//       {cb:function(){return '2-1'}, time: 1},
//       {cb:function(){return '2-2'}, time: 4}
//   ];
// > multiCallbacks(cbs1, cbs2);
// < ["2-1", "1-1", "1-2", "2-2"];

function multiCallbacks(cbs1, cbs2) {

}



// ----- BST -----

// EJERCICIO 8
// Implementar el metodo 'toArray' en el prototype del BinarySearchTree
// que devuelva los valores del arbol en una array ordenado
// Ejemplo:
//     32
//    /  \
//   8   64
//  / \
// 5   9
// resultado:[5,8,9,32,64]

BinarySearchTree.prototype.toArray = function () {

}



// ----- Algoritmos -----

// Ejercicio 9
// Implementar la funcion 'primalityTest' que dado un valor numerico entero
// debe de retornar true or false dependiendo de si este es primo o no.
// Puede que este es un algoritmo que ya hayan implementado pero entenderan
// que es un algoritmo que segun la implementacion puede llegar a ser muy costoso
// para numeros demasiado grandes, asi que vamos a implementarlo mediante un metodo
// derivado de Trial Division como el que se muestra aca:
// https://en.wikipedia.org/wiki/Primality_test
// Si bien esta no es la mejor implementacion existente, con que uds puedan 
// informarse sobre algoritmos, leerlos de un pseudocodigo e implemnterlos alcanzara

function primalityTest(n) {

}


// EJERCICIO 10
// Implementa el algoritmo conocido como 'quickSort', que dado un arreglo de elemntos
// retorn el mismo ordenado de 'mayor a menor!'
// https://en.wikipedia.org/wiki/Quicksort

function quickSort(array) {

}
// QuickSort ya lo conocen solo que este 
// ordena de mayor a menor
// para esto hay que unir como right+mid+left o cambiar el 
// signo menor en la comparacion con el pivot




// ----- EXTRA CREDIT -----

// EJERCICIO 11
// Implementa la función 'reverse', que recibe un numero entero como parametro
// e invierte el mismo.
// Pero Debería hacer esto sin convertir el número introducido en una cadena, o un array
// Ejemplo:
// > reverse(123);
// < 321
// > reverse(95823);
// < 32859

function reverse(num) {

}
// la grandiosa resolucion de Wilson!!!
// declaran una variable donde 
// almacenar el el numero invertido
// y van multiplicando por 10 la 
// porcion del numero que ya invirtieron
// deforma que esta se corra hacia la izq
// para agregar el ultimo numero de la 
// porcion no revertida
// y luego le quitan a la porcion 
// no revertida el ultimo numero

module.exports = {
    exponencial,
    direcciones,
    deepEqualArrays,
    OrderedLinkedList,
    multiCallbacks,
    primalityTest,
    quickSort,
    reverse,
    Queue,
    LinkedList,
    Node,
    BinarySearchTree
}