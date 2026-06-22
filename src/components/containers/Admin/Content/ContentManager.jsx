import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../../../dummies/PageHeader/PageHeader';
import AdminNav from '../../../../dummies/AdminNav/AdminNav';
import TextField from '../../../../dummies/TextField/TextField';
import Textarea from '../../../../dummies/Textarea/Textarea';
import Button from '../../../../dummies/Button/Button';
import Card from '../../../../dummies/Card/Card';
import ImageUploader from '../../../../business/ImageUploader/ImageUploader';
import RepeatableListEditor from '../../../../business/RepeatableListEditor/RepeatableListEditor';
import { saveBlock, uploadImage } from './actions/contentManagerActions';

function SaveButton({ onSave, isSaving }) {
  return (
    <Button onClick={onSave} disabled={isSaving}>
      {isSaving ? 'שומר...' : 'שמירה'}
    </Button>
  );
}

function HeroEditor({ initialValue, onSave }) {
  const [draft, setDraft] = useState(initialValue);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const handleUpload = async (file) => {
    setIsUploadingImage(true);
    try {
      const url = await uploadImage(file);
      setDraft((prev) => ({ ...prev, heroImageUrl: url }));
    } finally {
      setIsUploadingImage(false);
    }
  };

  return (
    <Card>
      <h3>אזור פתיחה (Hero)</h3>
      <TextField
        label="שורת פתיחה קצרה (eyebrow)"
        name="eyebrow"
        value={draft.eyebrow ?? ''}
        onChange={(v) => setDraft({ ...draft, eyebrow: v })}
      />
      <TextField label="כותרת" name="title" value={draft.title ?? ''} onChange={(v) => setDraft({ ...draft, title: v })} />
      <TextField
        label="כותרת משנה"
        name="subtitle"
        value={draft.subtitle ?? ''}
        onChange={(v) => setDraft({ ...draft, subtitle: v })}
      />
      <TextField
        label="טקסט כפתור הרשמה"
        name="ctaLabel"
        value={draft.ctaLabel ?? ''}
        onChange={(v) => setDraft({ ...draft, ctaLabel: v })}
      />
      <ImageUploader currentUrl={draft.heroImageUrl} onUpload={handleUpload} isUploading={isUploadingImage} />
      <SaveButton
        isSaving={isSaving}
        onSave={async () => {
          setIsSaving(true);
          await onSave(draft);
          setIsSaving(false);
        }}
      />
    </Card>
  );
}

function ListBlockEditor({ title, initialItems, fields, addLabel, onSave }) {
  const [items, setItems] = useState(initialItems);
  const [isSaving, setIsSaving] = useState(false);

  return (
    <Card>
      <h3>{title}</h3>
      <RepeatableListEditor items={items} fields={fields} onChange={setItems} addLabel={addLabel} />
      <SaveButton
        isSaving={isSaving}
        onSave={async () => {
          setIsSaving(true);
          await onSave({ items });
          setIsSaving(false);
        }}
      />
    </Card>
  );
}

function PageBodyEditor({ title, initialBody, onSave }) {
  const [body, setBody] = useState(initialBody);
  const [isSaving, setIsSaving] = useState(false);

  return (
    <Card>
      <h3>{title}</h3>
      <Textarea label="תוכן" name="body" value={body} onChange={setBody} rows={6} />
      <SaveButton
        isSaving={isSaving}
        onSave={async () => {
          setIsSaving(true);
          await onSave({ body });
          setIsSaving(false);
        }}
      />
    </Card>
  );
}

function MissionStatementEditor({ initialValue, onSave }) {
  const [draft, setDraft] = useState(initialValue);
  const [isSaving, setIsSaving] = useState(false);

  return (
    <Card>
      <h3>הצהרת משימה</h3>
      <TextField
        label="שורת פתיחה"
        name="intro"
        value={draft.intro ?? ''}
        onChange={(v) => setDraft({ ...draft, intro: v })}
      />
      <Textarea label="גוף ההצהרה" name="body" value={draft.body ?? ''} onChange={(v) => setDraft({ ...draft, body: v })} rows={3} />
      <Textarea label="ציטוט" name="quote" value={draft.quote ?? ''} onChange={(v) => setDraft({ ...draft, quote: v })} rows={3} />
      <SaveButton
        isSaving={isSaving}
        onSave={async () => {
          setIsSaving(true);
          await onSave(draft);
          setIsSaving(false);
        }}
      />
    </Card>
  );
}

export default function ContentManager() {
  const dispatch = useDispatch();
  const blocks = useSelector((state) => state.siteContent.blocks);

  const save = (key) => (value) => dispatch(saveBlock(key, value));

  return (
    <div className="page">
      <PageHeader title="ניהול תוכן האתר" />
      <AdminNav />

      <HeroEditor initialValue={blocks.hero ?? {}} onSave={save('hero')} />

      <MissionStatementEditor initialValue={blocks.mission_statement ?? {}} onSave={save('mission_statement')} />

      <ListBlockEditor
        title="מספרים (Stats)"
        initialItems={blocks.stats?.items ?? []}
        fields={[
          { key: 'label', label: 'תווית' },
          { key: 'value', label: 'ערך' },
        ]}
        addLabel="הוספת מספר"
        onSave={save('stats')}
      />

      <ListBlockEditor
        title="כרטיסי ערך (מה אנחנו עושים)"
        initialItems={blocks.value_props?.items ?? []}
        fields={[
          { key: 'title', label: 'כותרת' },
          { key: 'body', label: 'תוכן' },
        ]}
        addLabel="הוספת כרטיס"
        onSave={save('value_props')}
      />

      <ListBlockEditor
        title="חברות מספרות (Testimonials)"
        initialItems={blocks.testimonials?.items ?? []}
        fields={[
          { key: 'quote', label: 'ציטוט' },
          { key: 'authorName', label: 'שם' },
          { key: 'authorRole', label: 'ישוב / תפקיד' },
        ]}
        addLabel="הוספת ציטוט"
        onSave={save('testimonials')}
      />

      <ListBlockEditor
        title="ציר זמן"
        initialItems={blocks.timeline?.events ?? []}
        fields={[
          { key: 'year', label: 'שנה' },
          { key: 'label', label: 'תיאור' },
        ]}
        addLabel="הוספת אבן דרך"
        onSave={(value) => dispatch(saveBlock('timeline', { events: value.items }))}
      />

      <PageBodyEditor title="עמוד אודות" initialBody={blocks.about_page?.body ?? ''} onSave={save('about_page')} />
      <PageBodyEditor title="עמוד שירותים" initialBody={blocks.services_page?.body ?? ''} onSave={save('services_page')} />
      <PageBodyEditor title="עמוד יצירת קשר" initialBody={blocks.contact_page?.body ?? ''} onSave={save('contact_page')} />
    </div>
  );
}
