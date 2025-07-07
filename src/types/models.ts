
  export interface INQueen {
    size: number
    firstQueenPosition: number
    currentSolution : Array<number>
    allSolutions: Array<{}>
    validateConfig(): boolean
    initSolution(): void
    printSolution(): void
    getNewQueenPosition(i: number, col: number) : number
    registerSolution(solutionCounter: number) : void
    findAllSolutions(all: boolean): void
  }
  
  
  export class NQueen implements INQueen {
    size: number;
    firstQueenPosition: number;
    currentSolution : Array<number>;
    allSolutions: Array<{}>;
  
    constructor(size: number, firstQueenPosition: number) {
      this.size = size;
      this.firstQueenPosition = firstQueenPosition;
      this.currentSolution = [];
      this.allSolutions = [];
    }

    validateConfig(): boolean {
        
        if ((this.size % 1) !== 0 || (this.firstQueenPosition % 1 !== 0)) {
            return false;
        }
        if (this.size < 2 || this.firstQueenPosition < 0) {
            return false;
        }
        if (this.firstQueenPosition >= this.size) {
            return false
        }
        return true;
    }

    initSolution(): void {
        this.currentSolution.push(this.firstQueenPosition);
        for (let i=1; i < this.size; i++) {
            this.currentSolution.push(-1);
        } 
    }

    printSolution(): void {
        console.log(this.currentSolution);
        for (const columnNumber of this.currentSolution) {
            let rowToPrint = ' ';
            for (let i = 0;i < this.currentSolution.length; i++) {
                if (i === columnNumber) {
                    rowToPrint = rowToPrint + 'R ';
                } else {
                    rowToPrint = rowToPrint + '* ';
                }
            }
            console.log(rowToPrint);
        }
    }

    registerSolution(solutionCounter: number): void {
        this.allSolutions.push({solutionNumber: solutionCounter, content: [...this.currentSolution]});
    }

    findAllSolutions(all: boolean): void {

        let i = 1;
        let j = 0;
        let solutionsCounter = 0;
        while (i > 0 && i < this.currentSolution.length) {
            /* Find a valid position (column) for a new Queen */
            const newQueenPosition = this.getNewQueenPosition(i,j);
            if (newQueenPosition !== -1) {
                // We were able to find a valid position (column) for the new Queen
                this.currentSolution[i]=newQueenPosition;
                i++;
                j = 0;
            } else {
                // We move back to the previous row, erase the solution
                // we currently have for this row, and test a new solution
                // in this row with the next column ...
                i--;
                j = this.currentSolution[i]+1;
                this.currentSolution[i]=-1;
            }
            // In case we have found a solution, we show it in console, and
            // move back to the previous row to check if there are more solutions
            if (i === this.currentSolution.length && this.currentSolution[i-1] != -1) {
                // Here we use the spread operator [...] out to copy the 'solution'
                // array and store it into the allSolutions array, because the
                // sentence "solution[i]=-1" alter the content in 'solution'
                // as well as 'allSolutions'
                this.registerSolution(solutionsCounter++);
                if (all) {
                    // For n == 0 we will be looking for all possible solutions, otherwise
                    // we will finish the loop after just registring the first solution
                    // found for the specified matrix configuration
                    //this.printSolution();
                    i-=1;
                    j=this.currentSolution[i]+1;
                    this.currentSolution[i]=-1;
                } else {
                    break;
                }
            }
        }
    }

    /* Find a position for the new Queen, if possible */
    getNewQueenPosition(i: number, col: number) : number {
        let newPosition =-1;
        let j = col;
        while (j < this.currentSolution.length) {
            /*
                Here 
            */
            let k = 0;
            let matched = false;
            while (k < i && !matched) {
                /*
                Here we iterate until i, because we want to check out which
                values for columns (from 0 to solution.lenght -1) have been
                placed in each row, and i represents the current row we are
                trying to fill (the last row we want to check out)

                j stands for the value (column) we want to put in solution
                If 
                    that column already exists in a row between k and i-1
                    ( j === solution[k] )
                Or
                If 
                    the difference between rows === difference between columns
                    HAY QUE BUSCAR OTRA COLUMNA !!! """

                        => WE MUST FIND ANOTHER COLUMN
                */
                if (this.currentSolution[k] === j ||  Math.abs(i-k) === Math.abs(j- this.currentSolution[k])) {
                    matched = true;
                } else {
                    k++;
                }
            }
            if (!matched) {
                newPosition = j;
                j=this.currentSolution.length; // To break the outer loop
            } else {
                j++;
            }
        }
        return newPosition;
    }
  }
  
  