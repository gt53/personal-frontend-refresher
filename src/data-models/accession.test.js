import Accession from './accession';
import * as CONSTANTS from '../common/constants';

describe('Accession data model', () => {
  let input;
  const SOME_ID = 'some-id';
  const SOME_ORGANISM = 'some-organism';

  beforeEach(() => {
    input = {
      _source: {
        Accession: SOME_ID,
        organism: SOME_ORGANISM,
      },
    };
  });

  describe('organism getter', () => {
    it('provides the organism when set', () => {
      const accession = Accession.create(input);
      expect(accession.organism).toEqual(SOME_ORGANISM);
    });

    it('provides an empty string when the organism is not set', () => {
      delete input._source.organism;
      const accession = Accession.create(input);
      expect(accession.organism).toEqual('');
    });
  });

  describe('id getter', () => {
    it('provides the accession ID when set', () => {
      const accession = Accession.create(input);
      expect(accession.id).toEqual(SOME_ID);
    });

    it('provides an empty string when the accession ID is not set', () => {
      delete input._source.Accession;
      const accession = Accession.create(input);
      expect(accession.id).toEqual('');
    });
  });

  describe('url getter', () => {
    it('provides the URL when the "Authoritative Source URL" is set', () => {
      const SOME_URL = 'some-url';
      input._source['Authoritative Source URL'] = SOME_URL;
      const accession = Accession.create(input);
      expect(accession.url.endsWith(SOME_URL)).toBe(true);
    });

    it('provides the URL when the "Project Link" is set but the "Authoritative Source URL" is not set', () => {
      const SOME_URL = 'some-url';
      input._source['Project Link'] = SOME_URL;
      const accession = Accession.create(input);
      expect(accession.url).toEqual(SOME_URL);
    });

    it('provides the Authoritative State URL when that value is set and the "Project Link" is also set', () => {
      const SOME_URL_PROJECT = 'some-url-project';
      const SOME_URL_AUTHORITATIVE = 'some-url-authoritative';
      input._source['Project Link'] = SOME_URL_PROJECT;
      input._source['Authoritative Source URL'] = SOME_URL_AUTHORITATIVE;
      const accession = Accession.create(input);
      expect(accession.url.endsWith(SOME_URL_AUTHORITATIVE)).toBe(true);
    });

    it('provides an empty string when no URL is set', () => {
      const accession = Accession.create(input);
      expect(accession.url).toEqual('');
    });
  });

  describe('title getter', () => {
    it('provides the title when "Project "Title" is set', () => {
      const SOME_TITLE = 'some project title';
      input._source['Project Title'] = SOME_TITLE;
      const accession = Accession.create(input);
      expect(accession.title).toEqual(SOME_TITLE);
    });

    it('provides the title when "Project "Title" is not set but "Study Title" is set', () => {
      const SOME_TITLE = 'some study title';
      input._source['Study Title'] = SOME_TITLE;
      const accession = Accession.create(input);
      expect(accession.title).toEqual(SOME_TITLE);
    });

    it('provides the "Project Title" value when "Project "Title" and "Study Title" are both set', () => {
      const SOME_TITLE_PROJECT = 'some project title';
      const SOME_TITLE_STUDY = 'some study title';
      input._source['Project Title'] = SOME_TITLE_PROJECT;
      input._source['Study Title'] = SOME_TITLE_STUDY;
      const accession = Accession.create(input);
      expect(accession.title).toEqual(SOME_TITLE_PROJECT);
    });

    it('provides an empty string when neither "Project "Title" nor "Study Title" are set', () => {
      const accession = Accession.create(input);
      expect(accession.title).toEqual('');
    });
  });

  describe('date getter', () => {
    it('provides the date in the expected format when the study date is set', () => {
      const SOME_TIMESTAMP = '1553832000';
      input._source['Study Public Release Date'] = SOME_TIMESTAMP;
      const accession = Accession.create(input);
      expect(accession.date).toMatch(/\d{4}-\d{1,2}-\d{1,2}/);
    });

    it('provides an empty string when the study date is not set', () => {
      const accession = Accession.create(input);
      expect(accession.date).toEqual('');
    });
  });

  describe('thumbnailUrl getter', () => {
    it('provides the thumbnail URL when set', () => {
      const SOME_URL = 'some-url';
      input._source.thumbnail = SOME_URL;
      const accession = Accession.create(input);
      expect(accession.thumbnailUrl.endsWith(SOME_URL)).toBe(true);
    });

    it('provides an empty string when the thumbail URL is not set', () => {
      const accession = Accession.create(input);
      expect(accession.thumbnailUrl).toEqual('');
    });
  });
});
