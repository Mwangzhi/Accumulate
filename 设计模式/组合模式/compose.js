

/* 
组合模式就是用小的子对象来构建更大的对象，而这些小的子对象本身也许是由更
小的“孙对象”构成的。

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



