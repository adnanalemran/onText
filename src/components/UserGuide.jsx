
const UserGuide = () => {
    return (
        <div className="  mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg">


            <h1 className="text-2xl font-bold mb-4">Note-Taking Application User Guide</h1>

            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="mb-4">
                The Note-Taking Application allows users to create, save, and access notes using unique URLs based on the note title.
            </p>

            <h2 className="text-xl font-semibold mb-2">Accessing the Application</h2>
            <p className="mb-4">
                Open your browser and navigate to <a href="https://ontext.vercel.app" className="text-blue-400 underline">https://ontext.vercel.app</a>.
            </p>

            <h2 className="text-xl font-semibold mb-2">Creating a Note</h2>
            <p className="mb-4">
                To create a note, go to <span className="font-bold">https://ontext.vercel.app/[your-note-title]</span> (e.g.,
                <span className="font-bold"> https://ontext.vercel.app/My-Note</span>).
            </p>
            <p className="mb-4">
                Type your note in the text area and click the <span className="font-bold">Save</span> button to store it.
            </p>

            <h2 className="text-xl font-semibold mb-2">Accessing Your Note</h2>
            <p className="mb-4">
                To view your note later, simply return to <span className="font-bold">https://ontext.vercel.app/[your-note-title]</span>.
            </p>

            <h2 className="text-xl font-semibold mb-2">Exporting Your Note</h2>
            <p className="mb-4">
                Export your note as a .txt or .pdf file using the respective buttons for download.
            </p>

            <h2 className="text-xl font-semibold mb-2">Copying and Sharing</h2>
            <p className="mb-4">
                Click the <span className="font-bold">Copy</span> button to copy your note to the clipboard, or use the <span className="font-bold">Share</span> button to share via available apps.
            </p>

            <h2 className="text-xl font-semibold mb-2">Example</h2>
            <p className="mb-4">
                Create a note by visiting <span className="font-bold">https://ontext.vercel.app/My-First-Note</span>, type your content, and click <span className="font-bold">Save</span>.
            </p>
        </div>
    );
};

export default UserGuide;
