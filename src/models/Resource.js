/**
 * La classe Resourse represente une 
 * ressource qui peu etre utilise dans notre systeme
 */
export class Resource{
    /**
     * 
     * @param {string} name Le nom de la ressource
     * @param {int} priority la priorite de la ressource
     */
    constructor(name, priority){
        this.name = name
        this.priority = priority
    }

    /**
     * 
     * @param {int} priority Attribue un priorie a la ressource
     */
    setPriority(priority){
        this.priority= priority
    }
}