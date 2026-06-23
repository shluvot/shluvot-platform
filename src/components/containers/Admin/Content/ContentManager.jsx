import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../../../dummies/PageHeader/PageHeader';
import AdminNav from '../../../../dummies/AdminNav/AdminNav';
import TextField from '../../../../dummies/TextField/TextField';
import Textarea from '../../../../dummies/Textarea/Textarea';
import Button from '../../../../dummies/Button/Button';
import Card from '../../../../dummies/Card/Card';
import RepeatableListEditor from '../../../../business/RepeatableListEditor/RepeatableListEditor';
import { saveBlock } from './actions/contentManagerActions';

function SaveButton({ onSave, isSaving }) {
  return (
    <Button onClick={onSave} disabled={isSaving}>
      {isSaving ? 'שומר...' : 'שמירה'}
    </Button>
  );
}

function HeroEditor({ initialValue, onSave }) {
  const [draft, setDraft] = useState(initialValue);
  const [badges, setBadges] = useState((initialValue.badges ?? []).map((label) => ({ label })));
  const [isSaving, setIsSaving] = useState(false);

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
      <Textarea
        label="כותרת משנה"
        name="subtitle"
        value={draft.subtitle ?? ''}
        onChange={(v) => setDraft({ ...draft, subtitle: v })}
        rows={3}
      />
      <TextField
        label="טקסט כפתור הרשמה (ראשי)"
        name="ctaLabel"
        value={draft.ctaLabel ?? ''}
        onChange={(v) => setDraft({ ...draft, ctaLabel: v })}
      />
      <TextField
        label="טקסט כפתור משני"
        name="secondaryCtaLabel"
        value={draft.secondaryCtaLabel ?? ''}
        onChange={(v) => setDraft({ ...draft, secondaryCtaLabel: v })}
      />

      <h4>תגיות (badges)</h4>
      <RepeatableListEditor
        items={badges}
        fields={[{ key: 'label', label: 'טקסט תגית' }]}
        onChange={setBadges}
        addLabel="הוספת תגית"
      />

      <SaveButton
        isSaving={isSaving}
        onSave={async () => {
          setIsSaving(true);
          await onSave({ ...draft, badges: badges.map((b) => b.label) });
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

function HeadingBodyEditor({ title, initialValue, onSave, extraFields }) {
  const [draft, setDraft] = useState(initialValue);
  const [isSaving, setIsSaving] = useState(false);

  return (
    <Card>
      <h3>{title}</h3>
      <TextField label="תווית (// ...)" name="label" value={draft.label ?? ''} onChange={(v) => setDraft({ ...draft, label: v })} />
      <Textarea label="כותרת" name="heading" value={draft.heading ?? ''} onChange={(v) => setDraft({ ...draft, heading: v })} rows={2} />
      <Textarea label="תוכן" name="body" value={draft.body ?? ''} onChange={(v) => setDraft({ ...draft, body: v })} rows={5} />
      {extraFields?.map((field) => (
        <TextField
          key={field.key}
          label={field.label}
          name={field.key}
          value={draft[field.key] ?? ''}
          onChange={(v) => setDraft({ ...draft, [field.key]: v })}
        />
      ))}
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
      <PageHeader eyebrow="אדמין" title="ניהול תוכן האתר" />
      <AdminNav />

      <HeroEditor initialValue={blocks.hero ?? {}} onSave={save('hero')} />

      <HeadingBodyEditor title="אזור 'מי אנחנו'" initialValue={blocks.about_page ?? {}} onSave={save('about_page')} />

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

      <Card>
        <h3>יתרונות החברות באיגוד</h3>
        <TextField
          label="תווית (// ...)"
          name="benefits_label"
          value={blocks.value_props?.label ?? ''}
          onChange={(v) => dispatch(saveBlock('value_props', { ...blocks.value_props, label: v }))}
        />
        <TextField
          label="כותרת"
          name="benefits_heading"
          value={blocks.value_props?.heading ?? ''}
          onChange={(v) => dispatch(saveBlock('value_props', { ...blocks.value_props, heading: v }))}
        />
      </Card>

      <ListBlockEditor
        title="כרטיסי יתרונות"
        initialItems={blocks.value_props?.items ?? []}
        fields={[
          { key: 'title', label: 'כותרת' },
          { key: 'body', label: 'תוכן' },
        ]}
        addLabel="הוספת כרטיס"
        onSave={(value) => save('value_props')({ ...blocks.value_props, items: value.items })}
      />

      <HeadingBodyEditor
        title="אזור יצירת קשר"
        initialValue={blocks.contact_page ?? {}}
        onSave={save('contact_page')}
        extraFields={[
          { key: 'phone', label: 'טלפון' },
          { key: 'email', label: 'אימייל' },
        ]}
      />
    </div>
  );
}
