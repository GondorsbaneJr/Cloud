const { MusicBot } = require('discord.js-musicbot-addon');

module.exports = {
  setupMusicCommands: (client, prefix) => {
    const music = new MusicBot({
      youtubeKey: 'YOUR_YOUTUBE_API_KEY',
      botPrefix: prefix,
      botClient: client,
      maxQueueSize: 50,
      clearInvoker: true,
      bitRate: 'auto',
      defVolume: 50,
      volumeOnly: false,
      anyoneCanSkip: false,
      messageHelp: true,
      logging: true,
      botAdmins: [],
      musicPresence: true,
      disableLoop: false,
      enableQueueStat: true,
      helpCmd: 'musichelp',
      playCmd: 'play',
      searchCmd: 'search',
      removeCmd: 'remove',
      skipCmd: 'skip',
      stopCmd: 'stop',
      volumeCmd: 'volume',
      leaveCmd: 'leave',
      pauseCmd: 'pause',
      resumeCmd: 'resume',
      loopCmd: 'loop',
      enableQueueCmd: 'enablequeue',
      disableQueueCmd: 'disablequeue',
      queueCmd: 'queue',
      npCmd: 'np',
      scSearchCmd: 'scsearch',
      autoplayCmd: 'autoplay',
    });

    client.on('message', async (message) => {
      if (!message.content.startsWith(prefix) || message.author.bot) return;

      const args = message.content.slice(prefix.length).trim().split(/ +/);
      const command = args.shift().toLowerCase();

      if (command === 'play') {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply('You need to join a voice channel first!');
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
          return message.reply('I need the permissions to join and speak in your voice channel!');
        }
        if (!args[0]) return message.reply('You need to provide a song name or URL!');
        music.playFunction(message, args.join(' '));
      }
    });
  },
};