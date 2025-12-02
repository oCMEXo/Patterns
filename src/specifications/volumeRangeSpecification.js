const Warehouse = require('../warehouse');

class VolumeRangeSpecification {
  constructor(minVolume, maxVolume) {
    if (minVolume > maxVolume) {
      throw new Error('minVolume must be <= maxVolume');
    }
    this.minVolume = minVolume;
    this.maxVolume = maxVolume;
    this.warehouse = Warehouse.getInstance();
  }

  isSatisfiedBy(candidate) {
    const metrics = this.warehouse.get(candidate.id);
    if (!metrics) return false;
    const volume = metrics.volume;
    return volume >= this.minVolume && volume <= this.maxVolume;
  }
}

module.exports = VolumeRangeSpecification;
