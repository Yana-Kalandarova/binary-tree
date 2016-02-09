'use strict';

class BinaryTree {
	constructor() {
		this.root=null;
	}

	insert(data) {
		var node={
			data:data,
			left:null,
			right:null
		},
			currentNode;
		if(this.root===null){
			this.root=node;
		} else {
			currentNode=this.root;
			while(true){
				if(data<currentNode.data){
					if(currentNode.left===null){
						currentNode.left=node;
						break;
					} else {
						currentNode=currentNode.left;
					}
				} else if(data>currentNode.data){
					if(currentNode.right===null){
						currentNode.right=node;
						break;
					} else {
						currentNode=currentNode.right;
					}
				} else {
					break;
				}
			}
		}
	}

	contains(data) {
		var isFound=false,
			currentNode=this.root;
		while(!isFound && currentNode){
			if(data<currentNode.data){
				currentNode=currentNode.left;
			} else if(data>currentNode.data){
				currentNode=currentNode.right;
			} else {
				isFound=true;
			}
		}
		return isFound;	
	}

	remove(data) {
		var isFound=false,
			parentNode=null,
			currentNode=this.root,
			numChild,
			changeNode,
			changeParent;
		while(!isFound && currentNode){
			if(data<currentNode.data){
				parentNode=currentNode;
				currentNode=currentNode.left;				
			} else if(data>currentNode.data){
				parentNode=currentNode;
				currentNode=currentNode.right;
			} else {
				isFound=true
			}
		}
		if(isFound){
			numChild=(currentNode.left!==null ? 1 : 0)+(currentNode.right!==null ? 1 : 0);
			if(currentNode===this.root){
				switch(numChild){
					case 0:
						this.root=null;
						break;
						
					case 1:
						this.root=(currentNode.left===null ? currentNode.right : currentNode.left)
						break;
						
					case 2:
						changeNode=this.root.left;//10
						changeParent=this.root;//13
						while(changeNode.right!==null){
							changeParent=changeNode;
							changeNode=changeNode.right;
						}
						if(changeParent!==this.root){
							changeParent.right=changeNode.left;
							changeNode.left=this.root.left;
							changeNode.right=this.root.right;
						} else {
							changeNode.right=this.root.right;
						}
						this.root=changeNode;
						break;
				}
			} else {
				switch(numChild){
					case 0:
						if(currentNode.data<parentNode.data){
							parentNode.left=null;
						} else {
							parentNode.right=null;
						}
						break;
						
					case 1:
						if(currentNode.data<parentNode.data){
							parentNode.left=(currentNode.left===null ? currentNode.right :currentNode.left);
						} else {
							parentNode.right=(currentNode.left===null ? currentNode.right : currentNode.left);
						}
						break;
						
					case 2:
						changeNode=currentNode.left; //8
						changeParent=currentNode;//10
						while(changeNode.right!==null){
							changeParent=changeNode;
							changeNode=changeNode.right;
						}
						if(changeParent!==currentNode){
							changeParent.right=changeNode.left;	
							changeNode.left=currentNode.left;
							changeNode.right=currentNode.right;
						} else {
							changeNode.right=currentNode.right;
						}
						if(currentNode.data<parentNode.data){
							parentNode.left=changeNode;
						} else {
							parentNode.right=changeNode;
						}
						break;
				}				
			}
		}
	}
    traverse(process){
        function inOrder(node){
            if(node){
                if(node.left!==null){
                    inOrder(node.left);
                }
                process.call(this, node);
                if(node.right!==null){
                    inOrder(node.right);
                }
            }
        }
        inOrder(this.root);
    }
	
    size(){
        var length=0;
        this.traverse(calcSize);
        function calcSize(node){
            length++;
        }
        return length;
    }
	
	isEmpty() {
		return this.root===null
	}
}
