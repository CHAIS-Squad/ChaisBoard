# User Stories

## User story 1: Software Engineer Candidate

As a software engineer candidate hoping to land a dev job at a tech company, I want to use a simple and easy to use whiteboard tool that has all the features I’d need for my whiteboard interviews but not the extra “clutter” that other tools have

### Feature tasks

- Code Editor
- Text blocks
- Shapes
- Connectors
- Free draw pen
- undo/redo
- Colors for the text, shapes, connectors, and free draw features

### Acceptance tests

- Data persists on the page
- Objects (shapes, text, etc.) are responsive to resizing, dragging, dropping
- Simple and intuitive user interface - tools are easy to find and use so I’m not fumbling during my interview

## User story 2: Data Structure Templates

As a user, I want to have tools able to create the basic data structure drawings, so I can have more time in building up the algorithm and the code.

### Feature tasks

- Drawing tools that is premade for the basic data structure and have inputs on the data you want on your drawings
- Label on your drawing to add context and explanation to the drawn data structure

### Acceptance tests

- Verify that users can easily draw nodes, arrays , list  and trees

## User story 3: Login Optional

As a rushed software developer who is quickly trying to find a whiteboard, I want to be able to access the whiteboard tool without having to log in.

### Feature tasks

- Fully functional and accessible whiteboard without needing authorization.

### Acceptance tests

- Whiteboard loads without auth.
- Whiteboard is interactive without auth.
- Whiteboard can’t be saved due to no auth.

## User story 4: Code Editor

As a coder used to code editors and IDEs, I want an integrated code editor that is easy to use and behaves similarly to a simple code editor.

### Feature tasks

- Supports several popular programming languages
- Syntax highlighting of keywords
- Indentation and spacing

### Acceptance tests:

- Language keywords are highlighted
- Indentations and spaces are added as expected with tab and return

## User story 5: Drag-Drop, Annotation

As a dev, I want a versatile whiteboard tool to sketch ideas, annotate code, collaborate effectively, and experiment with code execution

### Feature tasks

- Feature task 1 - Implement drag-and-drop components for quick sketching
- Feature task 2 - Develop a annotation tools for clearer communication
- Feature task 3 - Integrate version control for tracking changes

### Acceptance tests

- Test 1 - Verify that dragged components are accurately place on
- Test 2 - Ensure annotation tools effectively mark-up code and sketches, with options to customize colors and styles
- Test 3 - Validate version control by checking that changes made to the whiteboard are properly recorded and can be reviewed in the revision history
