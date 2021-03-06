'use strict';

const DataTrackTransceiver = require('./transceiver');

/**
 * A {@link DataTrackReceiver} represents a {@link DataTrackTransceiver} over
 * which data can be received. Internally, it users a single RTCDataChannel to
 * receive data.
 * @extends DataTrackTransceiver
 * @emits DataTrackReceiver#message
 */
class DataTrackReceiver extends DataTrackTransceiver {
  /**
   * Construct an {@link DataTrackReceiver}.
   * @param {RTCDataChannel} dataChannel
   */
  constructor(dataChannel) {
    super(
      dataChannel.label,
      dataChannel.maxPacketLifeTime,
      dataChannel.maxRetransmits,
      dataChannel.ordered
    );

    // NOTE(mmalavalli): In Firefox, the default value for "binaryType" is "blob".
    // So, we set it to "arraybuffer" to ensure that it is consistent with Chrome
    // and Safari.
    dataChannel.binaryType = 'arraybuffer';

    dataChannel.addEventListener('message', event => {
      this.emit('message', event.data);
    });
  }
}

/**
 * @event DataTrackReceiver#message
 * @param {string|ArrayBuffer} data
 */

module.exports = DataTrackReceiver;
