"""Test DAG detection algorithm"""

from main import Node, Edge, is_dag

def test_dag_algorithm():
    """Run comprehensive DAG tests"""
    
    nodes = [
        Node(id="A", type="input", position={"x": 0, "y": 0}),
        Node(id="B", type="process", position={"x": 100, "y": 0}),
        Node(id="C", type="output", position={"x": 200, "y": 0})
    ]
    edges = [
        Edge(id="e1", source="A", target="B"),
        Edge(id="e2", source="B", target="C")
    ]
    assert is_dag(nodes, edges) == True
    print(" Linear DAG test passed")
    
    edges_with_cycle = [
        Edge(id="e1", source="A", target="B"),
        Edge(id="e2", source="B", target="C"),
        Edge(id="e3", source="C", target="A")  
    ]
    assert is_dag(nodes, edges_with_cycle) == False
    print(" Cycle detection test passed")
    
    assert is_dag([], []) == True
    print(" Empty graph test passed")
    
    assert is_dag([nodes[0]], []) == True
    print(" Single node test passed")
    
    complex_nodes = [
        Node(id="A", type="input", position={"x": 0, "y": 0}),
        Node(id="B", type="process", position={"x": 50, "y": -50}),
        Node(id="C", type="process", position={"x": 50, "y": 50}),
        Node(id="D", type="output", position={"x": 100, "y": 0})
    ]
    diamond_edges = [
        Edge(id="e1", source="A", target="B"),
        Edge(id="e2", source="A", target="C"),
        Edge(id="e3", source="B", target="D"),
        Edge(id="e4", source="C", target="D")
    ]
    assert is_dag(complex_nodes, diamond_edges) == True
    print(" Diamond DAG test passed")
    
    self_loop = [Edge(id="e1", source="A", target="A")]
    assert is_dag([nodes[0]], self_loop) == False
    print(" Self loop detection test passed")
    
    print(" All DAG tests passed!")

if __name__ == "__main__":
    test_dag_algorithm()