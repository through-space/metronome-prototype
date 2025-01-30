import { useEffect, useRef } from "react";
import { playSound } from "@components/atoms/SoundPlayer/SoundPlayerConsts";
export var SoundPlayer = function (_a) {
    var getVolume = _a.getVolume, getAudioFile = _a.getAudioFile, trigger = _a.trigger;
    var audioRef = useRef(null);
    var isFirstRender = useRef(true);
    useEffect(function () {
        audioRef.current = new Audio(getAudioFile());
        return function () {
            var _a;
            (_a = audioRef.current) === null || _a === void 0 ? void 0 : _a.pause(); // Cleanup: Stop audio when unmounting
            audioRef.current = null;
        };
    }, [getAudioFile]);
    useEffect(function () {
        if (!audioRef || !audioRef.current) {
            return;
        }
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        audioRef.current.volume = getVolume();
        playSound(audioRef, getVolume()).catch(function (err) {
            return console.error("Error playing sound:", err);
        });
    }, [trigger, getVolume]);
    return null;
};
