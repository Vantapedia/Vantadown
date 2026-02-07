// https://github.com/Fxc7/selfhost-dl/blob/main/src/system/patterns.js

const platformPatterns = {
    tiktok: /(?:https?:\/\/)?(?:www\.|vm\.|vt\.|m\.)?(?:tiktok\.com|tiktokcdn\.com)(?:\/.*)?/i,
    capcut: /(?:https?:\/\/)?(?:www\.|m\.)?(?:capcut\.com|capcutpro\.com)(?:\/.*)?/i,
    xiaohongshu: /(?:https?:\/\/)?(?:www\.|m\.)?(?:xiaohongshu\.com|xhslink\.com|xhs\.cn)(?:\/.*)?/i,
    threads: /(?:https?:\/\/)?(?:www\.|m\.)?threads\.net(?:\/.*)?/i,
    soundcloud: /(?:https?:\/\/)?(?:www\.|m\.)?(?:soundcloud\.com|snd\.sc)(?:\/.*)?/i,
    spotify: /(?:https?:\/\/)?(?:open\.)?spotify\.com(?:\/.*)?/i,
    facebook: /(?:https?:\/\/)?(?:www\.|m\.)?facebook\.com(?:\/.*)?/i,
    instagram: /(?:https?:\/\/)?(?:www\.|m\.)?instagram\.com(?:\/.*)?/i,
    youtube: /(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?/i,
    terabox: /(?:https?:\/\/)?(?:www\.|m\.)?(?:terabox\.com|teraboxapp\.com)(?:\/.*)?/i,
    snackvideo: /(?:https?:\/\/)?(?:www\.|m\.)?snackvideo\.com(?:\/.*)?/i,
    pinterest: /https?:\/\/id\.pinterest\.com\/pin\/\d+\/?/i
};

module.exports = platformPatterns;
