const { Serializer } = require('../../lib/serializer');

describe('Serializer', () => {
  describe('constructor', () => {
    describe('with no collectionName', () => {
      it('throws an error', () => {
        expect(() => new Serializer()).toThrow();
        expect(() => new Serializer({})).toThrow();
      });
    });

    describe('with collectionName', () => {
      it('stores collectionName and creates an empty meta object', () => {
        const serializer = new Serializer({ collectionName: 'serializers' });
        expect(serializer.collectionName).toEqual('serializers');
        expect(serializer.baseFields).toEqual([]);
        expect(serializer.meta).toEqual({});
      });
    });
  });

  describe('this.baseFields', () => {
    const baseFields = ['a', 'b', 'c'];
    const serializer = new Serializer({ collectionName: 'test' });
    serializer.baseFields = baseFields;
    const objectToSerialize = { a: 1, b: undefined };
    const serializedResult = serializer.serialize(objectToSerialize);

    it('adds all baseFields keys to the serializer output', () => {
      expect(Object.keys(serializedResult)).toEqual(baseFields);
    });

    describe('for keys that are not contained in the object', () => {
      it('outputs null', () => {
        expect(serializedResult.c).toBeNull();
      });
    });

    describe('for keys that are contained in the object', () => {
      describe('with a value of undefined', () => {
        it('outputs undefined', () => {
          expect(serializedResult.b).toBeUndefined();
        });
      });

      describe('with some other value', () => {
        it('outputs that value', () => {
          expect(serializedResult.a).toBe(1);
        });
      });
    });
  });

  describe('this.meta', () => {
    describe('renamed', () => {
      const inputKey = 'keyToRename';
      const outputKey = 'renamedTest';

      subject(() => {
        const serializer = new Serializer({ collectionName: 'test' });
        serializer.meta[outputKey] = Serializer.renamed(inputKey);
        return serializer.serialize(get('objectToSerialize'));
      });

      describe('when the object to serialize does not contain the key', () => {
        def('objectToSerialize', () => ({}));

        it('outputs null in the renamed key', () => {
          expect(subject()).toEqual({ [outputKey]: null });
        });
      });

      describe('when the object to serialize does contain the key', () => {
        describe('and its value is undefined', () => {
          def('objectToSerialize', () => ({ [inputKey]: undefined }));

          it('outputs undefined in the renamed key', () => {
            expect(subject()).toMatchObject({ [outputKey]: undefined });
          });
        });

        describe('and has some other value', () => {
          def('objectToSerialize', () => ({ [inputKey]: 123 }));

          it('outputs that value the renamed key', () => {
            expect(subject()).toEqual({ [outputKey]: 123 });
          });
        });
      });
    });
  });

  describe('serialize', () => {
    const serializer = new Serializer({ collectionName: 'asdf' });

    describe('when the argument is not of type object', () => {
      it('returns null', () => {
        expect(serializer.serialize(false)).toBeNull();
        expect(serializer.serialize(true)).toBeNull();
        expect(serializer.serialize('asdf')).toBeNull();
        expect(serializer.serialize(null)).toBeNull();
        expect(serializer.serialize(undefined)).toBeNull();
        expect(serializer.serialize(1)).toBeNull();
      });
    });

    describe('when the argument is an array', () => {
      it('nests the result in an object with a this.collectionName key', () => {
        expect(serializer.serialize([])).toEqual({ asdf: [] });
      });
    });
  });
});
