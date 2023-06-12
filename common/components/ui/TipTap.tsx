import {
  Box,
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  useTheme,
} from '@mui/material'

import Link from '@tiptap/extension-link'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import TextAlign from '@tiptap/extension-text-align'
import { Editor, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { MouseEvent, useCallback, useRef, useState } from 'react'
import { Icono } from './Icono'
import xss from 'xss'
interface MenuBarProps {
  editor: Editor
}
interface TipTapProps {
  editable: boolean
  contenido: string
  placeholder?: string
  onChange: (contenido: string) => void
}
interface TableType {
  filas: number
  columnas: number
}

const MenuBar = ({ editor }: MenuBarProps) => {
  // Menu tabla

  const [elementosMenuTabla, setElementosMenuTabla] =
    useState<null | HTMLElement>(null)

  const abrirMenuTabla = (event: MouseEvent<HTMLElement>) => {
    setElementosMenuTabla(event.currentTarget)
  }
  const cerrarMenuTabla = () => {
    setElementosMenuTabla(null)
  }

  const tablaCreacion = useRef<TableType>({ filas: 3, columnas: 3 })

  // Menu parrafo

  const [elementosMenuParrafo, setElementosMenuParrafo] =
    useState<null | HTMLElement>(null)

  const abrirMenuParrafo = (event: MouseEvent<HTMLElement>) => {
    setElementosMenuParrafo(event.currentTarget)
  }
  const cerrarMenuParrafo = () => {
    setElementosMenuParrafo(null)
  }

  const [buttonLinkReferencia, setButtonLinkReferencia] =
    useState<null | HTMLElement>(null)
  const [linkPrevio, setLinkPrevio] = useState('')

  const setLink = useCallback(
    // TODO: Mejorar funcionalidad de link
    (auxLink: string) => {
      const url = auxLink
      // cancelled
      if (url === null) {
        return
      }

      // empty
      if (url === '') {
        editor.chain().focus().extendMarkRange('link').unsetLink().run()
        return
      }

      // update link
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run()
    },
    [editor]
  )

  const abrirPopperLink = (event: MouseEvent<HTMLElement>) => {
    setButtonLinkReferencia(buttonLinkReferencia ? null : event.currentTarget)
  }
  const cerrarPopperLink = () => {
    setButtonLinkReferencia(null)
  }

  return (
    <>
      {/* Menu de tabla */}
      <Menu
        sx={{ mt: 0.5 }}
        id="menu-tabla"
        anchorEl={elementosMenuTabla}
        open={Boolean(elementosMenuTabla)}
        onClose={cerrarMenuTabla}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {/* Insertar tabla */}
        <Box>
          {tablaCreacion && (
            <Stack
              sx={{ ml: 2, mr: 2 }}
              direction={'row'}
              alignItems={'center'}
              // justifyContent={'flex-start'}
            >
              <ListItemText>Tabla Nueva</ListItemText>
              <TextField
                sx={{ width: 60, transform: 'scale(0.75)' }}
                defaultValue={tablaCreacion.current.columnas}
                label="Columna"
                type="number"
                inputProps={{ min: 1 }}
                onChange={(e) => {
                  tablaCreacion.current.columnas = parseInt(e.target.value)
                }}
              ></TextField>
              <TextField
                type="number"
                label="Fila"
                inputProps={{ min: 1 }}
                sx={{ width: 60, transform: 'scale(0.75)' }}
                defaultValue={tablaCreacion.current.filas}
                onChange={(e) => {
                  tablaCreacion.current.filas = parseInt(e.target.value)
                }}
              ></TextField>
              <Button
                variant="outlined"
                size="small"
                sx={{ mt: 0.6 }}
                onClick={() => {
                  editor
                    .chain()
                    .focus()
                    .insertTable({
                      rows: tablaCreacion.current.filas,
                      cols: tablaCreacion.current.columnas,
                      withHeaderRow: true,
                    })
                    .run()
                }}
              >
                Adicionar
                <Icono sx={{ ml: 1 }} color="inherit" fontSize="small">
                  add_circle
                </Icono>
              </Button>
            </Stack>
          )}
        </Box>
        {/* Adicionar columna antes */}
        <MenuItem
          onClick={() => editor.chain().focus().addColumnBefore().run()}
          disabled={!editor.can().addColumnBefore()}
        >
          <ListItemIcon>
            <Icono fontSize="small">add</Icono>
          </ListItemIcon>
          <ListItemText>Adicionar columna antes</ListItemText>
        </MenuItem>
        {/* Adicionar fila después */}
        <MenuItem
          onClick={() => editor.chain().focus().addColumnAfter().run()}
          disabled={!editor.can().addColumnAfter()}
        >
          <ListItemIcon>
            <Icono fontSize="small">add</Icono>
          </ListItemIcon>
          <ListItemText>Adicionar columna después</ListItemText>
        </MenuItem>
        {/* Eliminar columna */}
        <MenuItem
          onClick={() => editor.chain().focus().deleteColumn().run()}
          disabled={!editor.can().deleteColumn()}
        >
          <ListItemIcon>
            <Icono fontSize="small">disabled_by_default</Icono>
          </ListItemIcon>
          <ListItemText>Eliminar columna</ListItemText>
        </MenuItem>
        {/* Adicionar fila antes */}
        <MenuItem
          onClick={() => editor.chain().focus().addRowBefore().run()}
          disabled={!editor.can().addRowBefore()}
        >
          <ListItemIcon>
            <Icono fontSize="small">add</Icono>
          </ListItemIcon>
          <ListItemText>Adicionar fila antes</ListItemText>
        </MenuItem>
        {/* Adicionar fila después */}
        <MenuItem
          onClick={() => editor.chain().focus().addRowAfter().run()}
          disabled={!editor.can().addRowAfter()}
        >
          <ListItemIcon>
            <Icono fontSize="small">add</Icono>
          </ListItemIcon>
          <ListItemText>Adicionar fila después</ListItemText>
        </MenuItem>
        {/* Eliminar fila */}
        <MenuItem
          onClick={() => editor.chain().focus().deleteRow().run()}
          disabled={!editor.can().deleteRow()}
        >
          <ListItemIcon>
            <Icono fontSize="small">disabled_by_default</Icono>
          </ListItemIcon>
          <ListItemText>Eliminar fila</ListItemText>
        </MenuItem>
        {/* Eliminar tabla */}
        <MenuItem
          onClick={() => editor.chain().focus().deleteTable().run()}
          disabled={!editor.can().deleteTable()}
        >
          <ListItemIcon>
            <Icono fontSize="small">delete</Icono>
          </ListItemIcon>
          <ListItemText>Eliminar tabla</ListItemText>
        </MenuItem>
        {/* Unir celdas */}
        <MenuItem
          onClick={() => editor.chain().focus().mergeCells().run()}
          disabled={!editor.can().mergeCells()}
        >
          <ListItemIcon>
            <Icono fontSize="small">commit</Icono>
          </ListItemIcon>
          <ListItemText>Unir celdas</ListItemText>
        </MenuItem>
        {/* Separar celdas */}
        <MenuItem
          onClick={() => editor.chain().focus().splitCell().run()}
          disabled={!editor.can().splitCell()}
        >
          <ListItemIcon>
            <Icono fontSize="small">horizontal_split</Icono>
          </ListItemIcon>
          <ListItemText>Separar celdas</ListItemText>
        </MenuItem>
      </Menu>
      {/* Menu Link */}
      <Menu
        sx={{ mt: 0.5 }}
        id={'id-link'}
        open={Boolean(buttonLinkReferencia)}
        anchorEl={buttonLinkReferencia}
        onClose={cerrarPopperLink}
      >
        <Stack sx={{ p: 1 }}>
          <TextField
            defaultValue={editor.getAttributes('link').href}
            onChange={(e) => {
              setLinkPrevio(e.currentTarget.value)
            }}
            placeholder="https://mipagina.io"
            InputProps={{
              endAdornment: <Icono color="disabled">open_in_new</Icono>,
            }}
          ></TextField>
          <Stack
            direction={'row'}
            spacing={1}
            alignItems={'flex-end'}
            justifyContent={'flex-end'}
          >
            <IconButton
              onClick={() => {
                setLink('')
                cerrarPopperLink()
              }}
              size="small"
            >
              <Icono> link_off</Icono>
            </IconButton>
            <Button
              onClick={() => {
                setLink(linkPrevio)
                cerrarPopperLink()
              }}
              size="small"
              variant="outlined"
            >
              Guardar
            </Button>
          </Stack>
        </Stack>
      </Menu>
      {/* Menu Parrafo */}
      <Menu
        sx={{ mt: 0.5 }}
        id={'id-menu-parrafo'}
        anchorEl={elementosMenuParrafo}
        open={Boolean(elementosMenuParrafo)}
        onClose={cerrarMenuParrafo}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {/* Left Paragraph */}
        <MenuItem
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          selected={editor.isActive('left')}
        >
          <ListItemIcon>
            <Icono fontSize="small">format_align_left</Icono>
          </ListItemIcon>
          <ListItemText>Alinear Izquierda</ListItemText>
        </MenuItem>
        {/* Center Paragraph */}
        <MenuItem
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          selected={editor.isActive('center')}
        >
          <ListItemIcon>
            <Icono fontSize="small">format_align_center</Icono>
          </ListItemIcon>
          <ListItemText>Centrar</ListItemText>
        </MenuItem>
        {/* Right Paragraph */}
        <MenuItem
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          selected={editor.isActive('right')}
        >
          <ListItemIcon>
            <Icono fontSize="small">format_align_right</Icono>
          </ListItemIcon>
          <ListItemText>Alinear Derecha</ListItemText>
        </MenuItem>
        {/* Justify Paragraph */}
        <MenuItem
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          selected={editor.isActive({ textAlign: 'justify' })}
        >
          <ListItemIcon>
            <Icono fontSize="small">format_align_justify</Icono>
          </ListItemIcon>
          <ListItemText>Justificado</ListItemText>
        </MenuItem>
      </Menu>
      <Stack direction={'row'} spacing={2}>
        <ToggleButtonGroup aria-label="text formatting">
          {/* Bold */}
          <Tooltip title="Bold" placement="bottom-start">
            <ToggleButton
              LinkComponent={'span'}
              size="small"
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
              value={'bold'}
              selected={editor.isActive('bold')}
            >
              <Icono fontSize="small">format_bold</Icono>
            </ToggleButton>
          </Tooltip>
          {/* Italic */}
          <Tooltip title="Italic" placement="bottom-start">
            <ToggleButton
              LinkComponent={'span'}
              size="small"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
              value={'italic'}
              selected={editor.isActive('italic')}
            >
              <Icono fontSize="small">format_italic</Icono>
            </ToggleButton>
          </Tooltip>
          {/* Lista Númerica */}
          <Tooltip title="Lista ordenada" placement="bottom-start">
            <ToggleButton
              LinkComponent={'span'}
              size="small"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              value={'orderedList'}
              selected={editor.isActive('orderedList')}
            >
              <Icono fontSize="small">format_list_numbered</Icono>
            </ToggleButton>
          </Tooltip>
          {/* Lista Bolitas */}
          <Tooltip title="Lista de puntos" placement="bottom-start">
            <ToggleButton
              LinkComponent={'span'}
              size="small"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              value={'bulletList'}
              selected={editor.isActive('bulletList')}
            >
              <Icono fontSize="small">format_list_bulleted</Icono>
            </ToggleButton>
          </Tooltip>

          <Tooltip title="Alinear" placement="bottom-start">
            <ToggleButton
              LinkComponent={'span'}
              size="small"
              value={'parrafosicpo'}
              onClick={abrirMenuParrafo}
            >
              <Icono fontSize="small">view_headline</Icono>
              <Icono fontSize="small">arrow_drop_down</Icono>
            </ToggleButton>
          </Tooltip>
          {/* Link */}
          <Tooltip title="Insertar url" placement="bottom-start">
            <ToggleButton
              LinkComponent={'span'}
              size="small"
              value={'link'}
              selected={editor.isActive('link')}
              onClick={abrirPopperLink}
            >
              <Icono fontSize="small">link</Icono>
            </ToggleButton>
          </Tooltip>
          {/* Tablas  */}
          <Tooltip title="Opciones Tabla" placement="bottom-start">
            <ToggleButton
              LinkComponent={'span'}
              size="small"
              value={'tablas'}
              onClick={abrirMenuTabla}
            >
              <Icono fontSize="small">table_chart</Icono>
              <Icono fontSize="small">arrow_drop_down</Icono>
            </ToggleButton>
          </Tooltip>
        </ToggleButtonGroup>

        {/* Extras */}

        <Tooltip title="Volver a atras" placement="bottom-start">
          <ToggleButtonGroup>
            <ToggleButton
              size="small"
              value={'undo'}
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().chain().focus().undo().run()}
            >
              <Icono fontSize="small">undo</Icono>
            </ToggleButton>
          </ToggleButtonGroup>
        </Tooltip>
      </Stack>
    </>
  )
}

const Tiptap = ({ contenido, onChange, editable = true }: TipTapProps) => {
  const { palette } = useTheme()

  let editor: Editor | null = null
  editor = useEditor({
    editable: editable,

    onUpdate: () => {
      onChange(editor?.getHTML() ?? '')
    },
    onCreate: () => {
      if (editable) {
        onChange(editor?.getHTML() ?? '')
      }
    },

    extensions: [
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      StarterKit.configure({
        bulletList: {
          // keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          // keepMarks: true,
          keepAttributes: false,
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      // CustomTableCell,

      TableCell,
      Link.configure({
        openOnClick: !editable,
        linkOnPaste: false,
      }),
    ],
    content: contenido,
  })

  return (
    <Box>
      {editable && (
        <Stack sx={{ pb: 1 }} direction={'row'} justifyContent={'flex-start'}>
          {editor && <MenuBar editor={editor} />}
        </Stack>
      )}
      {editable ? (
        <EditorContent editor={editor} />
      ) : (
        <div
          dangerouslySetInnerHTML={{
            __html: xss(contenido ?? ''),
          }}
        ></div>
      )}
      {editable && (
        <style jsx global>{`
          .ProseMirror {
            padding-left: 20px;
            padding-right: 20px;
            border: 1px solid ${palette.primary.main};
            border-radius: 5px;
          }

          .ProseMirror:focus-visible {
            outline: 0 !important;
            border: 2px solid;

            border-color: ${palette.primary.main} !important;
          }

          table {
            border-collapse: collapse;
            table-layout: fixed;
            width: 100%;
            margin: 0;
          }
          td,
          th {
            min-width: 1em;
            border: 1px solid;
            padding: 3px 5px;
            vertical-align: top;
            box-sizing: border-box;
            position: relative;
          }
          th {
            text-align: left;
          }

          .selectedCell:after {
            z-index: 2;
            position: absolute;
            content: '';
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background: rgba(210, 210, 210, 0.4);
            pointer-events: none;
          }

          .column-resize-handle {
            position: absolute;
            right: -2px;
            top: 0;
            bottom: -2px;
            width: 2px;
            background-color: ${palette.primary.main};
            pointer-events: none;
          }

          .tableWrapper {
            padding: 1rem 0;
            overflow-x: auto;
          }

          .resize-cursor {
            cursor: ew-resize;
            cursor: col-resize;
          }
        `}</style>
      )}
    </Box>
  )
}

export default Tiptap
