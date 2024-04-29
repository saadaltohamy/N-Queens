# n-queens class
class Node():
    def __init__(self, n, state=[], parent=None) -> None:
        self.n = n
        self.state = state
        self.parent = parent
        self.successor = []
        self.depth = parent.depth + 1 if parent else 0
        self.PathCost = parent.PathCost + 1 if parent else 0

    def generate_successor(self):
        if self.depth < self.n:
            for i in range(self.n):
                new_state = self.state.copy()
                new_state.append([self.depth, i])
                child = Node(n=self.n, state=new_state, parent=self)
                self.successor.append(child)
        return self.successor
    
    def is_valid(self):
        for i in range(len(self.state)):
            for j in range(i + 1, len(self.state)):
                if self.state[i][0] == self.state[j][0] or \
                    self.state[i][1] == self.state[j][1] or \
                    abs(self.state[i][0] - self.state[j][0]) == abs(self.state[i][1] - self.state[j][1]):
                    return False
        return True

def dfs(n):
    initial_state = Node(n=n)
    frontier = [initial_state]
    solutions = []
    while frontier:
        current_node = frontier.pop()
        if not current_node.is_valid():
            continue
        if current_node.depth == n:
            solutions.append(current_node.state)
        successor = current_node.generate_successor()
        frontier.extend(successor)
    return solutions

solutions = dfs(4)
for solution in solutions:
    print(solution)

        