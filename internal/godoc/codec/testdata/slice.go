// Copyright 2020 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// DO NOT MODIFY. Generated code.

package somepkg

import (
	"reflect"
	"unsafe"

	"golang.org/x/pkgsite/internal/godoc/codec"
)

func encode_slice_slice_int(e *codec.Encoder, s [][]int) {
	if s == nil {
		e.EncodeUint(0)
		return
	}
	e.StartList(len(s))
	for _, x := range s {
		encode_slice_int(e, x)
	}
}

func decode_slice_slice_int(d *codec.Decoder, p *[][]int) {
	n := d.StartList()
	if n < 0 {
		return
	}
	s := make([][]int, n)
	for i := 0; i < n; i++ {
		decode_slice_int(d, &s[i])
	}
	*p = s
}

func init() {
	codec.Register([][]int(nil),
		func(e *codec.Encoder, x interface{}) { encode_slice_slice_int(e, x.([][]int)) },
		func(d *codec.Decoder) interface{} { var x [][]int; decode_slice_slice_int(d, &x); return x })
}

func encode_slice_int(e *codec.Encoder, s []int) {
	if s == nil {
		e.EncodeUint(0)
		return
	}
	e.StartList(len(s))
	for _, x := range s {
		e.EncodeInt(int64(x))
	}
}

func decode_slice_int(d *codec.Decoder, p *[]int) {
	n := d.StartList()
	if n < 0 {
		return
	}
	s := make([]int, n)
	for i := 0; i < n; i++ {
		s[i] = int(d.DecodeInt())
	}
	*p = s
}

func init() {
	codec.Register([]int(nil),
		func(e *codec.Encoder, x interface{}) { encode_slice_int(e, x.([]int)) },
		func(d *codec.Decoder) interface{} { var x []int; decode_slice_int(d, &x); return x })
}
