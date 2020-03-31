var v = require.main.require('./vars.js');

var backupFolderName = 'databackups';

module.exports = new v.c.cmd.Command(
    (args, msg) => {
        if (!v.modules.fs.existsSync('./'+backupFolderName)) v.modules.fs.mkdirSync(backupFolderName); //If the folder for backups of data doesn't exist, create it.

        let folderName = `${backupFolderName}/${String(Date.now())}`;
        v.modules.fs.mkdirSync(folderName); //Create a folder to store the current backup.

        for (i in v.d) {
            v.modules.fs.writeFileSync(`./${folderName}/${i}.json`,JSON.stringify(v.d[i]),'utf8');
        }

        return `Saved a backup of the data in \`./${folderName}\`.`;
    },

    {
        description: 'Saves a backup of all data files',
        adminOnly: true,
    }
);