import {
  Box,
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
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
import { MouseEvent, useCallback, useState } from 'react'
import { Icono } from './Icono'

interface MenuBarProps {
  editor: Editor
}
interface TipTapProps {
  editable: boolean
  contenido: string
  placeholder: string
  onChange: (contenido: string) => void
}

const MenuBar = ({ editor }: MenuBarProps) => {
  const [elementoMenuLista, setElementoMenuLista] =
    useState<null | HTMLElement>(null)

  const abrirMenuLista = (event: MouseEvent<HTMLElement>) => {
    setElementoMenuLista(event.currentTarget)
  }
  const cerrarMenulista = () => {
    setElementoMenuLista(null)
  }

  const [elementosMenuTabla, setElementosMenuTabla] =
    useState<null | HTMLElement>(null)

  const abrirMenuTabla = (event: MouseEvent<HTMLElement>) => {
    setElementosMenuTabla(event.currentTarget)
  }
  const cerrarMenuTabla = () => {
    setElementosMenuTabla(null)
  }

  const [buttonLinkReferencia, setButtonLinkReferencia] =
    useState<null | HTMLElement>(null)
  const [linkPrevio, setLinkPrevio] = useState('')

  const setLink = useCallback(
    (auxLink: string) => {
      // const previousUrl = editor.getAttributes('link').href
      // const url = window.prompt('Url', previousUrl)
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
  // useEffect(() => {
  //   if (editor.view && editor.view.domAtPos) {
  //     const cursor = editor.state.selection
  //     console.log('OSO entra en useEffect', cursor)
  //     if (cursor && cursor.$head) {
  //       const element = editor.view.domAtPos(cursor.$head.pos)
  //       setCursorReferencia(element.node.parentElement)
  //     }
  //     if (editor.isActive('link')) {
  //       setLink(editor.getAttributes('link').href)
  //     }
  //   }
  // }, [JSON.stringify(editor.state.selection)])

  const abrirPopperLink = (event: MouseEvent<HTMLElement>) => {
    setButtonLinkReferencia(buttonLinkReferencia ? null : event.currentTarget)
  }
  const cerrarPopperLink = () => {
    setButtonLinkReferencia(null)
  }

  return (
    <>
      {/* Menu de listas */}
      <Menu
        id="menu-lista"
        anchorEl={elementoMenuLista}
        open={Boolean(elementoMenuLista)}
        onClose={cerrarMenulista}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          selected={editor.isActive('orderedList')}
        >
          <ListItemIcon>
            <Icono fontSize="small">format_list_numbered</Icono>
          </ListItemIcon>
          <ListItemText>Ordenar lista</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          selected={editor.isActive('bulletList')}
        >
          <ListItemIcon>
            <Icono fontSize="small">format_list_bulleted</Icono>
          </ListItemIcon>
          <ListItemText>Circulos llenos</ListItemText>
        </MenuItem>
      </Menu>
      {/* Menu de tabla */}
      <Menu
        id="menu-tabla"
        anchorEl={elementosMenuTabla}
        open={Boolean(elementosMenuTabla)}
        onClose={cerrarMenuTabla}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
        >
          <ListItemIcon>
            <Icono fontSize="small">add_box</Icono>
          </ListItemIcon>
          <ListItemText>Nueva tabla</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => editor.chain().focus().addColumnBefore().run()}
          disabled={!editor.can().addColumnBefore()}
        >
          <ListItemIcon>
            <Icono fontSize="small">add</Icono>
          </ListItemIcon>
          <ListItemText>Adicionar columna antes</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => editor.chain().focus().addColumnAfter().run()}
          disabled={!editor.can().addColumnAfter()}
        >
          <ListItemIcon>
            <Icono fontSize="small">add</Icono>
          </ListItemIcon>
          <ListItemText>Adicionar columna después</ListItemText>
        </MenuItem>
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
      <Menu
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
          ></TextField>
          <Stack direction={'row'} spacing={1}>
            <Button
              onClick={() => {
                setLink('')
                cerrarPopperLink()
              }}
              size="small"
              variant="outlined"
            >
              <Icono fontSize="small">link_off</Icono>
            </Button>
            <Button
              onClick={() => {
                setLink(linkPrevio)
                cerrarPopperLink()
              }}
              size="small"
              variant="contained"
            >
              Guardar
            </Button>
          </Stack>
        </Stack>
      </Menu>
      <Stack direction={'row'} spacing={2}>
        <ToggleButtonGroup aria-label="text formatting">
          <ToggleButton
            size="small"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            value={'bold'}
            selected={editor.isActive('bold')}
          >
            <Icono fontSize="small">format_bold</Icono>
          </ToggleButton>

          <ToggleButton
            size="small"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            value={'italic'}
            selected={editor.isActive('italic')}
          >
            <Icono fontSize="small">format_italic</Icono>
          </ToggleButton>
          <ToggleButton
            size="small"
            value={'listas'}
            onClick={(e) => {
              abrirMenuLista(e)
            }}
          >
            <Icono fontSize="small">list</Icono>
            <Icono fontSize="small">arrow_drop_down</Icono>
          </ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup>
          {/* Left Paragraph */}
          <ToggleButton
            size="small"
            value={'left'}
            selected={editor.isActive('left')}
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
          >
            <Icono fontSize="small">format_align_left</Icono>
          </ToggleButton>
          {/* Center Paragraph */}
          <ToggleButton
            size="small"
            value={'center'}
            selected={editor.isActive('center')}
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
          >
            <Icono fontSize="small">format_align_center</Icono>
          </ToggleButton>
          {/* Right Paragraph */}
          <ToggleButton
            size="small"
            value={'right'}
            selected={editor.isActive('right')}
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
          >
            <Icono fontSize="small">format_align_right</Icono>
          </ToggleButton>
          {/* Justify */}
          <ToggleButton
            size="small"
            value={'justify'}
            selected={editor.isActive({ textAlign: 'justify' })}
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          >
            <Icono fontSize="small">format_align_justify</Icono>
          </ToggleButton>

          {/* Link */}

          <ToggleButton
            size="small"
            value={'link'}
            selected={editor.isActive('link')}
            onClick={abrirPopperLink}
          >
            <Icono fontSize="small">link</Icono>
          </ToggleButton>

          {/* Un Link */}
        </ToggleButtonGroup>
        {/* Tablas  */}
        <ToggleButtonGroup>
          <ToggleButton
            size="small"
            value={'tablas'}
            onClick={(e) => {
              abrirMenuTabla(e)
            }}
          >
            <Icono fontSize="small">table_chart</Icono>
            <Icono fontSize="small">arrow_drop_down</Icono>
          </ToggleButton>
        </ToggleButtonGroup>
        {/* Extras */}
        <ToggleButtonGroup>
          <ToggleButton
            size="small"
            value={'clear'}
            onClick={() => editor.chain().focus().unsetAllMarks().run()}
          >
            <Icono fontSize="small">clear_all</Icono>
          </ToggleButton>
          <ToggleButton
            size="small"
            value={'undo'}
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
          >
            <Icono fontSize="small">undo</Icono>
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </>
  )
}

const Tiptap = ({ contenido = '', onChange, editable = true }: TipTapProps) => {
  const { palette } = useTheme()

  const verificarJson = (dato: string): boolean => {
    try {
      JSON.parse(dato)

      return true
    } catch (error) {
      return false
    }
  }
  const editor: Editor | null = useEditor({
    editable: editable,

    onUpdate: () => {
      onChange(JSON.stringify(editor?.getHTML()))
    },
    onCreate: () => {
      onChange(JSON.stringify(editor?.getHTML()))
    },

    extensions: [
      //   Color.configure({ types: [TextStyle.name, ListItem.name] }),
      // Document,
      // Paragraph,
      // Text,

      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      StarterKit.configure({
        bulletList: {
          // keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          // keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
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
    content: contenido
      ? verificarJson(contenido)
        ? JSON.parse(contenido)
        : contenido
      : '',
  })

  return (
    <Box>
      {editable && (
        <Stack sx={{ pb: 1 }} direction={'row'} justifyContent={'flex-start'}>
          {editor && <MenuBar editor={editor} />}
        </Stack>
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

            > * {
              margin-bottom: 0;
            }
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
      <EditorContent editor={editor} />
    </Box>
  )
}

export default Tiptap
