# NodeJSEightQueens

A RESTFUL API to generate solutions for the 8 QUEENS problem

# Request Example

GET http://localhost:3000/eightqueens/size/8/first/3/all/false (these might have been query params)

board size = 8
Position for queen in 1st row = 3
all solutions = false

RESPONSE

```
{
    "message": "N QUEENS API RUN OK...solutions founds are",
    "matrix": {
        "size": 8,
        "firstQueenPosition": 3,
        "currentSolution": [
            3,
            0,
            4,
            7,
            1,
            6,
            2,
            5
        ],
        "allSolutions": [
            {
                "solutionNumber": 0,
                "content": [
                    3,                      ---> Queen in first row at position 3
                    0,                      ---> Queen in 2nd row at position 0
                    4,                      .
                    7,                      .
                    1,                      .
                    6,                      .
                    2,                      .
                    5                       .
                ]
            }
        ]
    }
}
```
