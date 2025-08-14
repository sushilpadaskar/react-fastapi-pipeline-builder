import React from 'react';
import { BaseNode } from '../nodes/baseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      description="Large Language Model processing"
      inputs={[
        { id: 'system' },
        { id: 'prompt' }
      ]}
      outputs={[{ id: 'response' }]}
      color="purple"
      icon="🤖"
      className="llm-node"
      minWidth={250}
    >
      <div className="llm-info">
        <p>AI-powered text generation and processing</p>
      </div>
    </BaseNode>
  );
};