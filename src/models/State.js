/**
 * La classe State definit l'etat d'une tache a un instant donnee
 */
export class State {
    /**
     * 
     * @param {int} x La coordonnne en x ou dessine l'etat
     * @param {int} y la coordonnne en y ou dessine l'etat
     * @param {string} color La couleur de remplisage de l'etat
     * @param {string} name Le nom de l'etat optionnel
     */
    constructor(x,y,color=0, name=""){
        this.x=x
        this.y=y
        this.color=color
        this.name=name
        this.wh = 20
    }
    /**
     * Affiche l'etat avec la couleur et a la position specifiée
     */
    show(){
        fill(this.color); // Use color variable 'c' as fill color
        rect(this.x, this.y-this.wh, this.wh, this.wh); // Draw rectangle
        this.showName()
    }
    /**
     * 
     * @param {int} size La taile de polie pour ecrire le nom de l'etat
     */
    showName(size=16){
        fill(0)
        let TextSize = size
        textSize(TextSize);
        text(`${this.name}`,this.x+(this.wh - TextSize),  this.y-(this.wh-TextSize));
        
    }
}