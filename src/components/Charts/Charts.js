import React, { useCallback } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background
} from "react-flow-renderer";

const initialNodes = [
  {
    id: "node-1",
    sourcePosition: "right",
    type: "input",
    data: { label: "Ingest Env Def and Build Model" },
    position: { x: 0, y: 80 },
    style: {
      "border-color": "blue",
      background: "aliceblue"
    }
  },
  {
    id: "node-2",
    sourcePosition: "right",
    targetPosition: "left",
    data: { label: "Generate infra config" },
    position: { x: 250, y: 0 },
    style: {
      "border-color": "green",
      background: "#4fdf38"
    }
  },
  {
    id: "node-3",
    sourcePosition: "right",
    targetPosition: "left",
    data: { label: "Node 3" },
    position: { x: 250, y: 160 },
    style: {
      "border-color": "black",
      background: "#ff00008c"
    }
  },
  {
    id: "node-4",
    sourcePosition: "right",
    targetPosition: "left",
    data: { label: "Provision Infra Resources" },
    position: { x: 500, y: 0 }
  },
  {
    id: "node-5",
    sourcePosition: "top",
    targetPosition: "bottom",
    data: { label: "Node 5" },
    position: { x: 500, y: 100 }
  },
  {
    id: "node-6",
    sourcePosition: "bottom",
    targetPosition: "top",
    data: { label: "Test Pipeline Availibility" },
    position: { x: 500, y: 230 }
  },
  {
    id: "node-7",
    sourcePosition: "right",
    targetPosition: "left",
    data: { label: "Smoke Test" },
    position: { x: 750, y: 50 }
  },
  {
    id: "node-8",
    sourcePosition: "right",
    targetPosition: "left",
    data: { label: "Node 8" },
    position: { x: 750, y: 300 }
  }
];

const initialEdges = [
  {
    id: "node-e1-2",
    source: "node-1",
    type: "smoothstep",
    target: "node-2",
    animated: true
  },
  {
    id: "node-e1-3",
    source: "node-1",
    type: "smoothstep",
    target: "node-3",
    animated: true
  },
  {
    id: "node-e1-4",
    source: "node-2",
    type: "smoothstep",
    target: "node-4",
    label: "edge label"
  },
  {
    id: "node-e3-5",
    source: "node-3",
    type: "smoothstep",
    target: "node-5",
    animated: true
  },
  {
    id: "node-e3-6",
    source: "node-3",
    type: "smoothstep",
    target: "node-6",
    animated: true
  },
  {
    id: "node-e5-7",
    source: "node-5",
    type: "smoothstep",
    target: "node-7",
    animated: true
  },
  {
    id: "node-e6-8",
    source: "node-6",
    type: "smoothstep",
    target: "node-8",
    animated: true
  }
];

const Charts = () => {
  const [nodes, _, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    [setEdges]
  );

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        attributionPosition="bottom-left"
      >
        <MiniMap
          nodeStrokeColor={(n) => {
            if (n.style?.background) return n.style.background;
            if (n.type === "input") return "#0041d0";
            if (n.type === "output") return "#ff0072";
            if (n.type === "default") return "#1a192b";

            return "#eee";
          }}
          nodeColor={(n) => {
            if (n.style?.background) return n.style.background;

            return "#fff";
          }}
          nodeBorderRadius={2}
        />
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </>
  );
};

export default Charts;
