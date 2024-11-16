import Listr from 'listr';
import { ChooseAction } from "../View/View.js";

// Based on user's choice, different tasks and their progresses would be shown.
export async function runTasks() {
  const action = await ChooseAction();
  // If user chooses only to validate dependencies, following tasks would show.
  if (action === 'validate') {
    try {
      await determineLinksHTML();
      await checkDependencies();
    } catch (err) {
      console.error(err);
    }
  }
  // If user chooses to validate and minify, following tasks would show.
  if (action === 'minify') {
    try {
      await determineLinksHTML();
      await checkDependencies();
      await readLinkedFiles();
      await removeDistFolder();
      await minifyJS();
      await createNewFileStructure();
      await minifiedJSToDist();
      await indexToDist();
    } catch (err) {
      console.error(err);
    }
  }
}

async function determineLinksHTML() {
  const tasks = new Listr([
    {
      title: 'Determine Links from the HTML File',
      task: async () => {
        await new Promise(resolve => setTimeout(resolve, 1000)); //Remove this for function body
      },
    },
  ])
  await tasks.run().catch(err => {
    throw new Error('An error occurred:', err);
  });
}

async function checkDependencies() {
  const tasks = new Listr([
    {
      title: 'Check Dependencies',
      task: async () => {

        const blah = os.homedir();
        console.log(blah);

      }
    },
  ])
  await tasks.run().catch(err => {
    throw new Error('An error occurred:', err);
  });
}

async function readLinkedFiles() {
  const tasks = new Listr([
    {
      title: 'Read in linked files',
      task: async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));//Remove this for function body
      },
    },
  ])
  await tasks.run().catch(err => {
    throw new Error('An error occurred:', err);
  });
}

async function removeDistFolder() {
  const tasks = new Listr([
    {
      title: 'Remove the dist folder',
      task: async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));//Remove this for function body
      },
    },
  ])
  await tasks.run().catch(err => {
    throw new Error('An error occurred:', err);
  });
}

async function minifyJS() {
  const tasks = new Listr([
    {
      title: 'Minify JS Code',
      task: async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));//Remove this for function body
      },
    },
  ])
  await tasks.run().catch(err => {
    throw new Error('An error occurred:', err);
  });
}

async function createNewFileStructure() {
  const tasks = new Listr([
    {
      title: 'Create the file structure for the following copy task',
      task: async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));//Remove this for function body
      },
    },
  ])
  await tasks.run().catch(err => {
    throw new Error('An error occurred:', err);
  });
}

async function minifiedJSToDist() {
  const tasks = new Listr([
    {
      title: 'Copy the minified javascript files to the dist folder',
      task: async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));//Remove this for function body
      },
    },
  ])
  await tasks.run().catch(err => {
    throw new Error('An error occurred:', err);
  });
}

async function indexToDist() {
  const tasks = new Listr([
    {
      title: 'Copy index.html file into the dist folder',
      task: async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));//Remove this for function body
      },
    },
  ])
  await tasks.run().catch(err => {
    throw new Error('An error occurred:', err);
  });
}