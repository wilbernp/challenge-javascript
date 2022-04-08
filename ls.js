function Lista(){
    this.head = null;
}

function Nodo(value){
    this.value = value;
    this.next = null;
}

Lista.prototype.add = function(value){
    let nodo = new Nodo(value)
    if(!this.head) this.head = nodo;
    let current = this.head;
    while(current.next){
        current = current.next;
    }

    current.next = nodo

}

Lista.prototype.remove = function(){
    if (!this.head) {
        return null;
    }

    if (!this.head.next) {
        let n = this.head.value
        this.head = null;
    }
    let n = this.head.value;
    this.head = this.head.next;
    return n;
    
}

let lis = new Lista()

lis.add(20)
console.log(lis);
let r = lis.remove()
console.log(lis)
console.log(r)