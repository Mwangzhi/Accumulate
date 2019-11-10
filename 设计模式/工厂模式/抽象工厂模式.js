

class Button {
    render() { }
}
class AppleButton {
    render() { }
}
class windowButton {
    render() { }
}

class Icon {
    render() { }
}
class AppleIcon {
    render() { }
}
class windowIcon {
    render() { }
}

class Factory {
    createButton() { }
    createIcon() { }
}
class AppleFactory {
    createButton() {
        return new AppleButton()
    }
    createIcon() {
        return new AppleIcon()
    }
}
class WindowFactory {
    createButton() {
        return new WindowButton()
    }
    createIcon() {
        return new windowIcon()
    }
}
const settings = {
    'apple': AppleFactory,
    'windows': WindowFactory
}

let appleFactory = new settings['apple']()
appleFactory.createButton().render()
appleFactory.createIcon().render()

let windowFactory = new settings['windows']()
windowFactory.createButton().render()
windowFactory.createIcon().render()


