const socket = io();

document.getElementById('executeButton').addEventListener('click', () => {
    const commandInput = document.getElementById('commandInput');
    const command = commandInput.value;

    socket.emit('command', command);
    commandInput.value = ''; // Clear input

    socket.on('output', (output) => {
        document.getElementById('output').textContent += output + '\n';
    });
});
