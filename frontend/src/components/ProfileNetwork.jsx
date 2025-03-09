import React, { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  Controls,
  Background,
  Handle,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { Button } from "@mui/material";

// Custom Tech Profile Node
const TechProfileNode = ({ data }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-3 flex flex-col items-center border border-gray-300">
      <Handle type="target" position="top" className="w-2 h-2 bg-blue-500" />
      <img src={data.img} alt="profile" className="w-16 h-16 rounded-full mb-2" />
      <div className="text-sm font-bold">{data.name}</div>
      <div className="text-xs text-gray-500">{data.role}</div>
      <Handle type="source" position="bottom" className="w-2 h-2 bg-blue-500" />
    </div>
  );
};

const nodeTypes = { tech: TechProfileNode };

// Initial network of users with root user and connected users
const initialNodes = [
  {
    id: "root",
    type: "tech",
    position: { x: 250, y: 50 },
    data: { name: "You", role: "Solutions Architect Intern / Student", img: "https://i.pravatar.cc/100?u=1" },
  },
  {
    id: "2",
    type: "tech",
    position: { x: 100, y: 200 },
    data: { name: "Bob", role: "Software Engineer", img: "https://i.pravatar.cc/100?u=2" },
  },
  {
    id: "3",
    type: "tech",
    position: { x: 400, y: 200 },
    data: { name: "Charlie", role: "Solutions Architect @ AWS", img: "https://i.pravatar.cc/100?u=3" },
  },
  {
    id: "4",
    type: "tech",
    position: { x: 250, y: 300 },
    data: { name: "Diana", role: "AI Engineer", img: "https://i.pravatar.cc/100?u=4" },
  },
  {
    id: "5",
    type: "tech",
    position: { x: 100, y: 400 },
    data: { name: "Eve", role: "DevOps Engineer", img: "https://i.pravatar.cc/100?u=5" },
  },
  {
    id: "6",
    type: "tech",
    position: { x: 400, y: 400 },
    data: { name: "Frank", role: "Cloud Architect", img: "https://i.pravatar.cc/100?u=6" },
  },
  // "Isolated" user (not connected yet)
  {
    id: "isolated-user",
    type: "tech",
    position: { x: 450, y: 0 },
    data: { name: "Grace", role: "Full Stack Developer", img: "https://i.pravatar.cc/100?u=7" },
  },
];

const initialEdges = [
  { id: "e1-2", source: "root", target: "2" },
  { id: "e1-3", source: "root", target: "3" },
  { id: "e1-4", source: "root", target: "4" },
  { id: "e1-5", source: "root", target: "5" },
  { id: "e1-6", source: "root", target: "6" },
];

const ProfileNetwork = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [clicked, setClicked] = useState(false);

  const connectIsolatedUser = useCallback(() => {
    setEdges((eds) => [
      ...eds,
      { id: "e1-isolated", source: "root", target: "isolated-user" },
    ]);
    setClicked((clicked) => !clicked);
  }, [setEdges]);

  return (
    <div className="flex flex-col w-full h-full bg-[#FFFAF0] px-4 items-center">
      {/* Button to connect isolated user to root */}
      <Button
        onClick={connectIsolatedUser}
        sx={{ fontSize: '12px',
        padding: '6px',
        borderRadius: '24px',
        color: '#533003',
        marginTop: '0px',

         }}
      >
        {!clicked ? "Add Jane to your network" : "Remove from your network"}
      </Button>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        style={{ height: "calc(100vh - 80px)" }} // Adjust height dynamically to fit container
      >
        <Controls />
        <Background color="#ddd" gap={20} />
      </ReactFlow>
    </div>
  );
};

export default ProfileNetwork;
