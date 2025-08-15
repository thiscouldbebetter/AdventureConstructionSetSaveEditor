
class TextDecoder
{
	// Adapted from:
	// https://github.com/danlb2000/ACSViewer/blob/master/TextDecoder.cs

	// The code in this file was originally part of ACSViewer, by danlb2000,
	// and is therefore licensed under the GNU General Public License.
	// 
	// For licensing information for this file, see:
	// https://github.com/danlb2000/ACSViewer/blob/master/ReadMe.txt

	constructor()
	{
		this.charactersAvailable =
			" ABCDEFGHIJKLMNOPQRSTUVWXYZ"
			+ "123456789";
	}

	static Instance()
	{
		if (this._instance == null)
		{
			this._instance = new TextDecoder();
		}
		return this._instance;
	}

	bytesDecodeToString(bytesToDecode)
	{
		var textSoFar = "";

		var radix = 40; // 26 letters + 9 numerals (no zero) + 5 punctuation marks?
		var radixSquared = radix * radix;

		for (var i = 0; i < bytesToDecode.length; i += 2)
		{
			var byteLow = bytesToDecode[i];
			var byteHigh = bytesToDecode[i + 1];

			var bytePairAsInteger =
				byteHigh * 256 + byteLow;
			var valueRemaining = bytePairAsInteger;

			var char1Index = Math.floor(valueRemaining / radixSquared);
			valueRemaining -= char1Index * radixSquared;

			var char2Index = Math.floor(valueRemaining / radix);
			var char3Index = valueRemaining - (char2Index * radix);

			textSoFar += this.charactersAvailable[char1Index];
			textSoFar += this.charactersAvailable[char2Index];
			textSoFar += this.charactersAvailable[char3Index];
		}

		return textSoFar;
	}
}
