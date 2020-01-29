

/* 
组合模式就是用小的子对象来构建更大的对象，而这些小的子对象本身也许是由更
小的“孙对象”构成的。无论是小的对象还是最终组合而成的对象，他们都有共同
的接口，比如都有execute方法，也成为多态性。

组合模式最大的优点在于可以一致地对待组合对象和基本对象。
文件夹和文件之间的关系，非常适合用组合模式来描述。文件夹里既可以包含文件，又可以
包含其他文件夹，最终可能组合成一棵树，

只有用一致的方式对待列表中的每个叶对象的时候，才适合使用组合模式

组合模式可以让我们使用树形方式创
建对象的结构。我们可以把相同的操作应用在组合对象和单个对象上。在大多数情况下，我们都
可以忽略掉组合对象和单个对象之间的差别，从而用一致的方式来处理它们。
*/


function MacroCommand() {
    return {
        commandsList: [],
        add(command) {
            this.commandsList.push(command);
        },
        execute() {
            this.commandsList.forEach(command => command.execute());
        }
    }
}
//命令1
let openTVCommand = {
    execute() { console.log('打开电视--->1') }
}
//命令2
let closeDoorCommand = {
    execute() { console.log('关门--->2'); }
}
//命令3
let openPcCommand = {
    execute() { console.log('打开电脑--->3') }
}
//命令4
let openQQCommand = {
    execute() { console.log('打开QQ--->4'); }
}
//命令可以是已经组合后的命令对象,bigCommand就是一个大的命令对象
let bigCommand = MacroCommand();
bigCommand.add(openPcCommand);
bigCommand.add(openQQCommand);

// macroCommand是最后的命令对象
let macroCommand = MacroCommand();
macroCommand.add(openTVCommand);
macroCommand.add(closeDoorCommand);
macroCommand.add(bigCommand);
macroCommand.execute();



