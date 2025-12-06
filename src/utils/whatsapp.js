// Compatibility shim: re-export utilities from src/shared/lib/utils/whatsapp.js
// Many files in the project import from '../../utils/whatsapp' (or similar).
// This file preserves those import paths while keeping the canonical implementation
// inside src/shared/lib/utils/whatsapp.js
export { openWhatsApp, openWhatsAppOrtochavitos } from '../shared/lib/utils/whatsapp';
