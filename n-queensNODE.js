class Node
{
    constructor(n, state=[], parent = null)
    {
        this.n = n;
        this.state = state;
        this.parent = parent;
        this.successors = [];
        this.depth = parent ? parent.depth + 1 : 0;
        this.PathCost = parent ? parent.PathCost + 1 : 0;
    }

    generate_sccessors()
    {
        if(this.depth < this.n)
        {
            for(let i = 0; i < this.n; i++)
            {
                let new_state = [...this.state];
                new_state.push([this.depth, i]);
                let child = new Node(this.n, new_state, this);
                this.successors.push(child);
            }
        }
        return this.successors;
    }

    is_valid()
    {
        for(let i = 0; i < this.state.length - 1; i++)
        {
            for(let j = i + 1; j < this.state.length; j++)
            {
                if(this.state[i][1] === this.state[j][1] ||
                    this.state[i][0] === this.state[j][0] ||
                    Math.abs(this.state[i][0] - this.state[j][0]) === Math.abs(this.state[i][1] - this.state[j][1]))
                    {
                        return false;
                    }
            }
        }
        return true;
    }
}

function dfs(n) {
    let initial_state = new Node(n);
    let frontier = [initial_state];
    let solutions = []; // Array to store all solutions

    while (frontier.length > 0) {
        let current_node = frontier.pop();
        if (!current_node.is_valid()) {
            continue;
        }
        if (current_node.depth === n) {
            solutions.push(current_node.state); // Add current solution to the array
            continue; // Continue searching for more solutions
        }
        let successors = current_node.generate_sccessors();
        frontier = frontier.concat(successors);
    }

    return solutions; // Return all solutions
}

let solutions = dfs(4);
solutions.forEach(solution => {
    console.log(solution);
});

export default dfs;