import React, { useEffect, useRef } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

interface Props {
  aiOutput: string;
}

const OutputSection = ({ aiOutput }: Props) => {
  const editorRef = useRef<Editor>(null);

  useEffect(() => {
    const editorInstance = editorRef.current?.getInstance();
    if (editorInstance) {
      editorInstance.setMarkdown(aiOutput || '');
    }
  }, [aiOutput]);

  const handleCopy = () => {
    const markdown = editorRef.current?.getInstance().getMarkdown() || '';
    navigator.clipboard.writeText(markdown)
      .then(() => {
        console.log('Copied to clipboard');
        // You could add a toast/notification here.
      })
      .catch((err) => {
        console.error('Failed to copy:', err);
      });
  };

  return (
    <div className="bg-white shadow-lg border rounded-lg">
      <div className="p-5 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Result</h2>
        <Button type="button" onClick={handleCopy}>
          <Copy className="w-4 h-4 mr-2" /> Copy
        </Button>
      </div>
      <Editor
        ref={editorRef}
        initialValue="Your Result will appear here"
        height="600px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
      />
    </div>
  );
};

export default OutputSection;
